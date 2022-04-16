import express from 'express' 
import fileController from '../controller/file.controller.js'  
import multer from "multer";
import { MongoClient } from 'mongodb';    
import config from '../utils/config.js'
import { GridFsStorage } from 'multer-gridfs-storage'; 

import methodOverride from 'method-override';
import crypto from 'crypto' 
import path from 'path';


const url = config.db.url; 
const mongoClient = new MongoClient(url); 
const route = express.Router()
const storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: config.db.imgBucket
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });
 
route.post("/upload", upload.single("file"), (req, res) => {
    res.status(200)
    res.json({file:req.file})
  });
route.get('/files', fileController.getListFiles  )  
route.get('/files/:filename', fileController.getFile  )
route.get('/image/:filename', fileController.getImage  )  
route.get('/download/:name',   fileController.download) 


export default route