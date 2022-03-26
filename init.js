import authenticationDao from './model/authentication.dao.js'
import empleadosDAO from './model/empleados.dao.js'

authenticationDao.register(  { 
    "name": "admin",
    "email": "admin@email.com",
    "rol": "admin",
    "password": "asdasdasd"
  }  )
    .then(() => {
        console.log("Usuario creado")
    })
    authenticationDao.register(  { 
      "name": "juan perez",
      "email": "jperez@email.com",
      "rol": null,
      "password": "asdasdasd"
    }  )
      .then(() => {
          console.log("Usuario creado")
      })
   
console.log("Inicamos el proyecto")