import multer from "multer";
import { MongoClient } from 'mongodb';    
import config from '../utils/config.js'
const url = config.db.url;
const baseUrl = "http://localhost:9001/files/";
const mongoClient = new MongoClient(url); 
import { GridFsStorage } from 'multer-gridfs-storage'; 
 
 
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
      const cursor = images.find({});
      if ((await cursor.count()) === 0) {
        return res.status(500).send({
          message: "No files found!",
        });
      }
      let fileInfos = [];
      await cursor.forEach((doc) => {
        fileInfos.push({
          name: doc.filename,
          url: baseUrl + doc.filename,
        });
      });
      return res.status(200).send(fileInfos);
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
      const bucket = new GridFSBucket(database, {
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
  upload
};