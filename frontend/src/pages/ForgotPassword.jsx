import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormGroup, Container, Box } from '@mui/material'
import { useAuth } from '../context/Auth.Context'

import { useForgotPass, ForgotPassProvider } from '../context/ForgotPass.Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {   Link} from 'react-router-dom'
 
function ForgotPassword() {
    
const {  sendResetEmail, forgotPass } = useForgotPass();
     const [ email, setEmail ] = useState('') 
  
    function onSubmit(event) {
        event.preventDefault()
        sendResetEmail(email)  
    }
    return (
        <Container className="login" maxWidth="sm">
            <Box>
               
                <FormGroup>
                    <TextField label="E-Mail" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                   
                </FormGroup>
              
                <Button variant="outlined" onClick={(event) => onSubmit(event)}>Resetear</Button>
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
            </Box>
           
        </Container>
    )
}

function ForgotPassPage(props) {
    return (
    <div>
         <h1>Resetear la clave</h1>
        <ForgotPassProvider>
            <ForgotPassword />
        </ForgotPassProvider>
    </div>
    )
    }
    export default ForgotPassPage;