import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {   Link} from 'react-router-dom'
import { FormGroup, Container, Box } from '@mui/material'
import { useAuth } from '../context/Auth.Context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as API from '../api/api.auth'
import { useNavigate } from 'react-router-dom'
function Register({ onRegister }) {
    const { state, dispatch } = useAuth()
    const [ email, setEmail ] = useState('')
    const [ user, setUser ] = useState('')
    const [ password, setPassword ] = useState('')

    let navigate = useNavigate();
    function onSubmit(event) {
        event.preventDefault()

        API.register(email, password, user)
        .then(function(data) {
            localStorage.setItem('token', data.token)
            dispatch({ type: 'REGISTER', payload: data.user })
            toast.success("Registro exitoso");
            
        })
        .catch(function(error){
            toast.error("Ocurrio un error al intentar registrar el usuario");
        })
        navigate('/auth/guide/login')
    }
    return (
        <Container className="register" maxWidth="sm">
            <Box><h1>Registrarse</h1>
                <FormGroup>
                    <TextField label="E-Mail" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                </FormGroup>
                <FormGroup>
                    <TextField label="Password" type="password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                </FormGroup> <FormGroup>
                    <TextField label="Nombre Usuario" type="text" value={user} onChange={(event) => { setUser(event.target.value) }} />
                </FormGroup>

                <Button variant="outlined" className= "btn-detail"  onClick={(event) => onSubmit(event)}>Registrarse</Button>
                 
                <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
{/* Same as */}
<ToastContainer />
            </Box>   <Link  className= "btn-cuenta"  style={{"marginTop": "2em" }} 
              to={`/login`} > ¿Ya tenes cuenta? Haz click aqui para iniciar sesion   </Link>
           
        </Container>
    )
}

export default Register