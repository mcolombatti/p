import jwt from 'jsonwebtoken'

/**
 * Se encarga de validar las credenciales del usuario con el token enviado en el header
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export function guide_validator(req, res, next){
    const token = req.header('auth-token')

    if (token){
        try {
            const userData = jwt.verify(token, "SECRETO")
            req.user = userData
            if(req.user.rol == 'guide'){
             
                next()
            }
            else {
                return res.status(401).json({error: 400, msg: 'Acceso no autorizado'})
            }
        } catch (err) {
            return res.status(400).json({error: 400, msg: 'Token invalido'})
        }
    }
    else {
        return res.status(400).json({error: 400, msg: 'Token no enviado'})
    }
}
  
export default {
    guide_validator 
}