import express from 'express' 
import fileController from '../controller/file.controller.js'  
const route = express.Router()
import multer from "multer";
import { MongoClient } from 'mongodb';    
import config from '../utils/config.js'
const url = config.db.url; 
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

 
route.post("/upload", upload.single("file"), (req, res) => {
    res.status(200)
      .send("File uploaded successfully");
  });
route.get('/files', fileController.getListFiles  )  
route.get('/files/:name',   fileController.download) 


export default route