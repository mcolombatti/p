import jwt from 'jsonwebtoken'
import config from '../utils/config.js'
/**
 * Se encarga de validar las credenciales del usuario con el token enviado en el header
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export function validator(req, res, next) {
    const token = req.header('auth-token')

    if (token) {
        try {
            const userData = jwt.verify(token, config.token.secret)
            req.user = userData
            next()
        } catch (err) {
            return res.status(400).json({ error: 400, msg: 'Token invalido' })
        }
    }
    else {
        return res.status(400).json({ error: 400, msg: 'Token no enviado' })
    }
}
export function generate(data) {
    return jwt.sign(data, config.token.secret)
}

export default {
    validator,
    generate
}
