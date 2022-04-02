import express from 'express'
import config from '../utils/config.js'
import toursApiController from '../controller/toursApi.controller.js'
import { validator } from '../middleware/validatorToken.js'
import { admin_validator } from '../middleware/admin_validator.js'

const route = express.Router()


route.get('/', [admin_validator], toursApiController.findAll)

route.get('/query', [admin_validator],toursApiController.getTourByGuideId)
route.post('/', [admin_validator], toursApiController.createTour)
route.put('/:id', [admin_validator], toursApiController.updateTour)
route.get('/:id', [validator], toursApiController.getTour) 
route.delete('/:id', [admin_validator], toursApiController.deleteTour) 


export default route