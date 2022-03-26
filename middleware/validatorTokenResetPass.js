import jwt from 'jsonwebtoken'

/**
 * Se encarga de validar las credenciales del usuario con el token enviado en el header
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export function validatorTokenResetPass(req, res, next) {
    const token = req.params.token

    if (token) {
        try {
            const userData = jwt.verify(token, "SECRETO")
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
    return jwt.sign(data, "SECRETO")
}

export default {
    validatorTokenResetPass,
    generate
}
