 
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormGroup, Container, Box } from '@mui/material'
  
import {   Link} from 'react-router-dom'
import {   useNavigate  } from 'react-router-dom';

import { useAuth } from '../context/Auth.Context'

function Logout({ onLogout }) { 

    let navigate = useNavigate();
    const { state, dispatch } = useAuth()
    function onSubmit(event) {
        event.preventDefault() 
        localStorage.removeItem('token');
        localStorage.removeItem('user');
            dispatch({ type: 'LOGOUT', payload: ['token', 'user'] }) 
            navigate('/auth/guide/login')
        }  
    return (
       
        <Button color="inherit">   <Link to="#" id="logout" onClick={(event) => onSubmit(event)}>Logout</Link></Button>
        
    )
}

export default Logout