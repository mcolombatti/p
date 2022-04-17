import express from 'express'
import config from '../utils/config.js'
import toursApiController from '../controller/toursApi.controller.js'
import { validator } from '../middleware/validatorToken.js'
import { guide_validator } from '../middleware/admin_validator.js'

const route = express.Router()


route.get('/',   toursApiController.findAll)

route.get('/query', toursApiController.getTourByQuery) 
route.post('/',   toursApiController.createTour)
route.put('/:id',   toursApiController.updateTour)
route.get('/:id', [validator], toursApiController.getTour) 
route.delete('/:id',  toursApiController.deleteTour) 


export default route