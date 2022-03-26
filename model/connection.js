import mongodb from 'mongodb'
import config from '../utils/config.js' 
import logger from '../utils/logger.js'

const client = new mongodb.MongoClient(config.db.url)
 
/**
 * Se encarga de hacer la conexión con la base de datos.
 * 
 * @param {Function} callback 
 * @returns {Promise}
 */

export async function connection(callback){
    try {
        await client.connect()
        const result = await callback(client.db('tour_app'))
          
        logger.info('connected to MongoDB')
        return result
    } catch (error) {
        logger.error('error connecting to MongoDB:', error.message)
    }
   
}
export default {
    connection
}