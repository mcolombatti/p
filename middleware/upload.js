import multer from "multer";
import util from 'util'  
import {GridFsStorage} from "multer-gridfs-storage"; 
import config from '../utils/config.js' 
var storage = new GridFsStorage({
    url: config.db.url,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      const match = ["image/png", "image/jpeg"];
      if (match.indexOf(file.mimetype) === -1) {
        const filename = `${Date.now()}-bezkoder-${file.originalname}`;
        return filename;
      }
      return {
        bucketName: config.db.imgBucket,
        filename: `${Date.now()}-bezkoder-${file.originalname}`
      };
    }
  });
  var uploadFiles = multer({ storage: storage }).single("file");
  var uploadFilesMiddleware = util.promisify(uploadFiles); 
export default {
    uploadFilesMiddleware
}