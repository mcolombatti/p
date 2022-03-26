import {
    connection
} from '../model/connection.js'
import bcrypt from 'bcrypt'
import mongodb from 'mongodb'
/**
 * Llama a la conexión con la base de datos para loguear al usuario con las credenciales enviadas por parámetro
 * 
 * @param { string } email 
 * @param { string } password 
 * @return { Promise }
 */
async function login(email, password) {
    return await connection(async function (db) {
        const user = await db.collection('Users').findOne({
            email: email
        })

        if (user) {
            const validate = await bcrypt.compare(password, user.password)
            if (validate) {
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    rol: user.rol
                }
            } else {
                throw {
                    error: 403,
                    msg: "El password enviado no coincide con nuestros registros"
                }
            }
        } else {
            throw {
                error: 404,
                msg: "El email no existe en nuestros registros"
            }
        }
    })
}
/**
 * Llama a la conexión con la base de datos para registrar al usuario con las credenciales enviadas por parámetro
 * 
 * @param {Object} user 
 * @returns {Promise}
 */
async function register(user) {
    return connection(async function (db) {
        const oldUser = await db.collection('Users').findOne({
            email: user.email
        })
        if (!oldUser) {
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(user.password, salt)

            await db.collection('Users').insertOne({
                name: user.name,
                email: user.email,

                rol: user.rol,
                password: password
            }).catch(function (err) {

                res.status(500).json({
                    error: 500,
                    msg: `Ocurrió un error inesperado ${err}`
                })

            })

        } else {
            throw {
                error: 400,
                msg: "El usuario ya existe en nuestros registros."
            }
        }
    })
}
/**
 * Retorna un array con los documentos del cursor
 * @returns {Promise} 
 */
async function findAll() {
    return await connection(async function (db) {
        return await db.collection('Users').find().toArray() // usamos toArray porque tenemos que retornar en un array los documentos del cursor
    })
}

/**
 * Retorna un array con los documentos del cursor
 * @returns {Promise} 
 */
async function resetPass(email) {
    return await connection(async function (db) {
        const user = await db.collection('Users').findOne({
            email: email
        })
        if (user) {

            return {
                id: user._id,
                name: user.name,
                email: user.email,
                rol: user.rol
            }

        } else {
            throw {
                error: 404,
                msg: "El email no existe en nuestros registros"
            }
        }
    })
}
async function generatePass(user, id) {
    return connection(async function (db) {
        if (user) {
            if (user.password == user.password2) {
                const salt = await bcrypt.genSalt(10)
                const password = await bcrypt.hash(user.password, salt)

                return await db.collection('Users').updateOne({
                    _id: mongodb.ObjectId(id)
                }, {
                    $set: {
                        password: password

                    }

                })
            } else {
                throw {
                    error: 400,
                    msg: "los passwords no coinciden"
                }
            }
        } else {
            throw {
                error: 400,
                msg: "no se envió el password"
            }
        }
    }

    )
}

export default {
    login,
    resetPass,
    generatePass,
    register,
    findAll
}