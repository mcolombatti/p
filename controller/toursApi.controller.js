import toursDao from '../model/tours.dao.js'
import * as yup from 'yup'

const schema = yup.object({
    titulo: yup.string('El titulo debe estar compuesto por cadena de texto').required("Es obligatorio ingresar un titulo"),
    descripcion: yup.string('la descripcion debe estar compuesta por cadena de texto').required("Es obligatorio ingresar una descripcion"),
    cancelacion: yup.bool().required(),
    idioma: yup.string('el idioma no puede tener numeros').required("El idioma es obligatorio").min(3, 'El idioma tiene que tener al menos 3 caracteres').max(70, 'el idioma no puede superar los 70 caracteres'),
    duracion: yup.number('la duracion debe contener numeros').required(),
    incluido: yup.array().nullable(), 
    precioReserva: yup.number('el precio solo puede contener numeros').required("El precio de la reserva es obligatorio"),
    categoria: yup.string('la categoria  debe estar compuesto por cadena de texto').required(),
    fechaActividad: yup.date('la fecha de la actividad tiene que tener formato fecha').required(),
    horaActividad: yup.string('').required(),
    minutosActividad: yup.string('').required(),

}).noUnknown()


/**
 * Busca todos los usuarios de la base de datos 
 * 
 * @param req 
 * @param res 
 */
export async function findAll(req, res) {
    toursDao.viewAllTours()
        .then(function (result) {
            res.json(result)
        })
        .catch(function (err) {
            if (err.error) {
                res.status(400).json({ error: 400, msg: err.msg })
            }
            else {
                res.status(500).json({ error: 500, msg: `Ocurrió un error inesperado ${err}` })
            }
        })
}

/**
 * Busca todos los usuarios de la base de datos 
 * 
 * @param req 
 * @param res 
 */
export async function createTour(req, res) {
    schema.validate(req.body)
        .then(function (data) {
            toursDao.insertTour(req.body)
                .then(function (result) {
                    res.json(result)
                })
                .catch(function (err) {
                    if (err.error) {
                        res.status(400).json({ error: 400, msg: err.msg })
                    }
                    else {
                        res.status(500).json({ error: 500, msg: `Ocurrió un error inesperado ${err}` })
                    }
                })
        })

        .catch(function (err) {
            res.status(400).json({ error: 400, msg: err.message })
        })
}
/**
 * Busca todos los usuarios de la base de datos 
 * 
 * @param req 
 * @param res 
 */
export async function createTours(req, res) {
    schema.validate(req.body)
        .then(function (data) {
            toursDao.insertTours(req.body)
                .then(function (result) {
                    res.json(result)
                })
                .catch(function (err) {
                    if (err.error) {
                        res.status(400).json({ error: 400, msg: err.msg })
                    }
                    else {
                        res.status(500).json({ error: 500, msg: `Ocurrió un error inesperado ${err}` })
                    }
                })
        })

        .catch(function (err) {
            res.status(400).json({ error: 400, msg: err.message })
        })
}
/**
 * Busca todos los usuarios de la base de datos 
 * 
 * @param req 
 * @param res 
 */
export async function updateTour(req, res) {
    toursDao.updateTourById(req.params.id, req.body)
        .then(function (result) {
            res.json(result)
        })
        .catch(function (err) {
            if (err.error) {
                res.status(400).json({ error: 400, msg: err.msg })
            }
            else {
                res.status(500).json({ error: 500, msg: `Ocurrió un error inesperado ${err}` })
            }
        })
}
/**
 * Busca todos los usuarios de la base de datos 
 * 
 * @param req 
 * @param res 
 */
export async function getTour(req, res) {
    toursDao.getById(req.params.id,)
        .then(function (result) {
            res.json(result)
        })
        .catch(function (err) {
            if (err.error) {
                res.status(400).json({ error: 400, msg: err.msg })
            }
            else {
                res.status(500).json({ error: 500, msg: `Ocurrió un error inesperado ${err}` })
            }
        })
}
/**
 * Busca todos los usuarios de la base de datos 
 * 
 * @param req 
 * @param res 
 */
export async function getTourByGuideId(req, res) {
    toursDao.guideId(req.params.id)
        .then(function (result) {
            res.json(result)
        })
        .catch(function (err) {
            if (err.error) {
                res.status(400).json({ error: 400, msg: err.msg })
            }
            else {
                res.status(500).json({ error: 500, msg: `Ocurrió un error inesperado ${err}` })
            }
        })
}
/**
 * Busca todos los usuarios de la base de datos 
 * 
 * @param req 
 * @param res 
 */
export async function getTourByGuideId(req, res) {

    toursDao.viewTourByQuery(req.query)
        .then(function (result) {

            res.json(result)
        })
        .catch(function (err) {
            if (err.error) {
                res.status(400).json({ error: 400, msg: err.msg })
            }
            else {
                res.status(500).json({ error: 500, msg: `O ${err}` })
            }
        })
}
/**
 * Busca todos los usuarios de la base de datos 
 * 
 * @param req 
 * @param res 
 */
export async function deleteTour(req, res) {
    toursDao.deleteById(req.params.id)
        .then(function (result) {
            res.json(result)
        })
        .catch(function (err) {
            if (err.error) {
                res.status(400).json({ error: 400, msg: err.msg })
            }
            else {
                res.status(500).json({ error: 500, msg: `Ocurrió un error inesperado ${err}` })
            }
        })
}

  
export default {
     createTour, updateTour, getTourByGuideId,deleteTour, createTours, findAll, getTour
};
