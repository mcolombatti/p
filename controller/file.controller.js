import multer from "multer";
import { MongoClient } from 'mongodb';    
import config from '../utils/config.js'
const url = config.db.url; 
const mongoClient = new MongoClient(url);   
import { GridFsStorage } from 'multer-gridfs-storage'; 
import mongodb from 'mongodb'
import fs from 'fs'
await mongoClient.connect();
      const db = mongoClient.db(config.db.dbName); 
const storage = new GridFsStorage({
    url: config.db.url,
    file: (req, file) => {
      if (file.mimetype === 'image/jpeg') {
        return {
          bucketName: config.db.imgBucket
        };
      } else {
        return null;
      }
    }
  });
  const upload = multer({ storage });

  const getListFiles = async (req, res) => {
    try {
      await mongoClient.connect();
      const database = mongoClient.db(config.db.dbName);
      const images = database.collection(config.db.imgBucket + ".files");
      const cursor = images.find({}).toArray((err, files)=>{
        if(!files || files.length === 0){
          return res.status(400).json({
            err: "No files found!",
          });
        }
        return res.json(files)
      });
     
      
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  };
  const getFile = async (req, res) => {
    try {
      await mongoClient.connect();
      const database = mongoClient.db(config.db.dbName);
      const images = database.collection(config.db.imgBucket + ".files");
      const cursor = images.findOne({filename: req.params.filename}, (err, file) =>{
        if(!file || file.length === 0){
          return res.status(400).json({
            err: "No files found!",
          });
        }
        return res.json(file)
      });
     
      
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  };
  const getImage = async (req, res) => {
    try {
      await mongoClient.connect();
      const database = mongoClient.db(config.db.dbName);
      const images = database.collection(config.db.imgBucket + ".files");
      const cursor = images.findOne({filename: req.params.filename}, (err, file) =>{
        if(!file || file.length === 0){
          return res.status(400).json({
            err: "No se encontraron archivos",
          });
        }  
        bucket.openDownloadStreamByName(file.filename).
     pipe(fs.createWriteStream('./outputFile'));
        }
      );
     
      
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  };
  const download = async (req, res) => {
    try {
      await mongoClient.connect();
      const database = mongoClient.db(config.db.dbName);
      const bucket = new mongodb.GridFSBucket(db, {
        bucketName: config.db.imgBucket,
      });
      let downloadStream = bucket.openDownloadStreamByName(req.params.name);
      downloadStream.on("data", function (data) {
        return res.status(200).write(data);
      });
      downloadStream.on("error", function (err) {
        return res.status(404).send({ message: "Cannot download the Image!" });
      });
      downloadStream.on("end", () => {
        return res.end();
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  };
export default   { 
  getListFiles,
  download,
  upload,
  getFile,getImage
};