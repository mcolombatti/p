import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useEmpleado, EmpleadoProvider } from '../context/Empleado.Context';
 
 import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';import Card from '@mui/material/Card';
 import CardActions from '@mui/material/CardActions';
 import CardContent from '@mui/material/CardContent';
 import CardMedia from '@mui/material/CardMedia';
 import Button from '@mui/material/Button';
 import Typography from '@mui/material/Typography';
 import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
 import IconButton from '@mui/material/IconButton';
const Empleado = () => {
    const { empleado, useIdFetch } = useEmpleado();
    
    const userid = JSON.parse(localStorage.getItem('userid'))
    const user = JSON.parse(localStorage.getItem('user'))  
    const { state: empleadoD} = useIdFetch(userid);
  
    return (
            <div>
            <h1>Beneficios favoritos de {user.name} </h1>
              <EmpleadoInfo empleadoD={empleadoD} />
          </div>
    )
  }
  const EmpleadoInfo = ({ empleadoD }) => {
    const { empleado, completar } = useEmpleado(); 
    const userid = JSON.parse(localStorage.getItem('userid'))
    
   {/*} function onSubmit(event) { 
        completar( userid)   
      };*/}
       
    return (<div>
                          
{!empleadoD.favoritos && <p>{'No tenes cargados favoritos aun'}</p>}
       {empleadoD.favoritos?.map(item => (<div>
       
        <li>
           <Card key={item._id} sx={{ maxWidth: 345 }}>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {item.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {item.descripcion}
        </Typography>
      </CardContent>
      <CardActions>
      
      
      </CardActions>
    </Card> 
         </li>
     </div>
      ))}
    </div>
    )
}
function GetEmpleado(props) {
    return (
    <div>
         
        <EmpleadoProvider>
            <Empleado />
        </EmpleadoProvider>
    </div>
    )
    }
    export default GetEmpleado;