import express from 'express'
import authUserController from '../controller/authUser.controller.js'
import { validator } from '../middleware/validatorToken.js'
import { validatorTokenResetPass } from '../middleware/validatorTokenResetPass.js'
import { admin_validator } from '../middleware/admin_validator.js'
const route = express.Router()

route.post('/register', authUserController.register)
route.post('/login', authUserController.login)

route.get('/', [admin_validator], authUserController.findAll)

route.post('/forgot-password', authUserController.forgotPassword);

route.post('/reset-password/:id/:token', [validatorTokenResetPass], authUserController.resetPassword);

export default route