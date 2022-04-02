import mongodb from 'mongodb'
import { connection } from './connection.js'

export async function viewAllTours() {
    return connection(
        async function (db) {
            return await db.collection('Tours').find({}).toArray()
        }
    )
}
export async function getById(id) {
    return connection(async function (db) {
        return await db.collection("Tours").findOne({ _id: mongodb.ObjectId(id) })
    })
}
export async function guideId(id) {
    return connection(async function (db) {
        return await db.collection("Tours").findOne({ userid: mongodb.ObjectId(id) })
    })
}

export async function viewTourByQuery(query) {

    return connection(async function (db) {
        return await db.collection('Tours').find(query).toArray()
    })
}


export async function insertTour(entity) {
    return connection(
        async function (db) {
            await db.collection("Tours").insertOne(entity)
            return entity
        }
    )
}


export async function insertTours(entity) {
    return connection(
        async function (db) {
            await db.collection("Tours").insertMany(entity)
            return entity
        }
    )
}



export async function updateTourById(id, entity) {

    return connection(async function (db) {
        return await db.collection("Tours").replaceOne({ _id: mongodb.ObjectId(id) }, entity)
    })
}


/**
 * Hace un delete  del testimonio con el id que le pase 
 * por query para borrar el testimonio de la base de datos
 * 
 * @returns Promise
 * @param id (int)
 */

export async function deleteById(id) {
    return connection(async function (db) {
        return await db.collection("Tours").deleteOne({ _id: mongodb.ObjectId(id) }) // hace un delete del testimonio con el id que le pase por query
    })
}

export async function patch(id, entity) {
    return connection(async function (db) {
        return await db.collection("Tours").updateOne({ _id: mongodb.ObjectId(id) }, { $push: { "capacitacion": entity } })
    })
} 
export default { 
    viewAllTours,
    insertTour,
    deleteById, patch, guideId,
    updateTourById, getById, viewTourByQuery, insertTours
}


