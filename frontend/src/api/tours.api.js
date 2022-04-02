import config from '../config/config';

export async function deleteTour(id) {
    return fetch(`${config.api.url}/tours/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${localStorage.getItem('token')}`
        }
    })
        .then(res => res.json())
        .catch(function (res, err) {
            if (err.error) {
                res.status(400).json({ error: 400, msg: `La información enviada no es correcta. No pudimos eliminar el registro ${err}` })
            }
            else {
                res.status(500).json({ error: 500, msg: `Ocurrió un error inesperado ${err}` })
            }
        })
}
export async function getTours() {
    return fetch(`${config.api.url}/tours`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${localStorage.getItem('token')}`
        }
    })
        .then(res => res.json())
        .catch(function (res, err) {
            if (err.error) {
                res.status(404).json({ error: 400, msg: ` La información solicitada no existe ${err}` })
            }
            else {
                res.status(500).json({ error: 500, msg: `Ocurrió un error inesperado ${err}` })
            }
        })
}
export async function getToursByIdGuide(id) {
    return fetch(`${config.api.url}/tours/query?userid=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${localStorage.getItem('token')}`
        }
    })
        .then(res => res.json())
        .catch(function (res, err) {
            if (err.error) {
                res.status(404).json({ error: 400, msg: ` La información solicitada no existe ${err}` })
            }
            else {
                res.status(500).json({ error: 500, msg: `Ocurrió un error inesperado ${err}` })
            }
        })
}
export async function createTour(tour) {
    return fetch(`${config.api.url}/tours/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(tour)
    })
        .then(function (res) {
            res.json({ msg: "Usuario registrado satisfactoriamente" })
        })
        .catch(function (res, err) {
            if (err.error) {
                res.status(400).json({ error: 400, msg: `La información enviada no es correcta. No pudimos crear el registro ${err}` })
                console.log(err.error)
            }
            else {
                res.status(500).json({ error: 500, msg: `Ocurrió un error inesperado ${err}` })
            }
        })
}

export async function getTourDetails(id) {
    return fetch(`${config.api.url}/tours/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${localStorage.getItem('token')}`
        }
    })
        .then(res => res.json())
        .catch(function (res, err) {
            if (err.error) {
                res.status(404).json({ error: 400, msg: ` La información solicitada no existe ${err}` })
            }
            else {
                res.status(500).json({ error: 500, msg: `Ocurrió un error inesperado ${err}` })
            }
        })
}
export async function assignCapacitacionTour(id, capacitacion) {
    return fetch(`${config.api.url}/tours/${id}/capacitaciones`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(capacitacion)
    })
        .then(function (res) {
            if (res.status === 200) {
                return res.json()
            }
            else {
                throw new Error('Hubo un error al intentar asignar la capacitación')
            }
        })
}

export async function completarCapacitacion(id) {
    return fetch(`${config.api.url}/tours/${id}/capacitaciones/estado`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${localStorage.getItem('token')}`
        },

    })
        .then(function (res) {
            if (res.status === 200) {
                return res.json()
            }
            else {
                throw new Error('Hubo un error al intentar actualizar la información')
            }
        })
}
export async function editTour(id, tour) {
    return fetch(`${config.api.url}/tours/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(tour)
    })
        .then(function (res) {
            if (res.status === 200) {
                return res.json()
            }
            else {
                throw new Error('Hubo un error al intentar editar el usuario')
            }
        })
}
export async function agregarBeneficioFavoritos(userId, beneficio) {
    return fetch(`${config.api.url}/tours/${userId}/favoritos`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(beneficio)
    })
        .then(function (res) {
            if (res.status === 200) {
                return res.json()
            }
            else {
                throw new Error('Hubo un error al intentar agregar el beneficio a favoritos')
            }
        })
}
export default {
    agregarBeneficioFavoritos, getToursByIdGuide,deleteTour, editTour, getTours, createTour, completarCapacitacion, getTourDetails, assignCapacitacionTour
}