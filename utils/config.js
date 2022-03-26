import dotenv from 'dotenv'
dotenv.config();

export default {
     
    db: { 
        url: process.env.MONGODB,
        dbName: process.env.DB
    },
    middleware: {
        access: process.env.MW_ACCESS || '123',
        port:  process.env.PORT
    },
    auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
    },
    token: {
        secret: process.env.SECRET,
            }
}