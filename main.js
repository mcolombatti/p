import express from 'express'
import userAuthRouter from './router/userAuth.router.js'
import toursApiRouter from './router/toursApi.router.js' 
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path';
import config from './utils/config.js'
import logger from './utils/logger.js'
const __dirname = path.resolve();
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use('/user', userAuthRouter)

app.use("/api/tours", toursApiRouter); 
//app.use("/home", pageRouter); 
// ... other imports 

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "frontend", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});
app.listen(config.middleware.port, () => {
    logger.info(`Server running on port ${config.middleware.port}`
    )
  })