import express from 'express'
import authUserController from '../controller/authUser.controller.js'
import { validator } from '../middleware/validatorToken.js'
import { validatorTokenResetPass } from '../middleware/validatorTokenResetPass.js'
import { guide_validator } from '../middleware/admin_validator.js'
const route = express.Router()

route.post('/guide/register', authUserController.registerGuide)
route.post('/user/register', authUserController.registerUser)
route.post('/guide/login', authUserController.login)

route.get('/', [guide_validator], authUserController.findAll)

route.post('/guide/forgot-password', authUserController.forgotPassword);

route.post('/guide/reset-password/:id/:token', [validatorTokenResetPass], authUserController.resetPassword);

export default route