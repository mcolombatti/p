import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useEmpleado, EmpleadoProvider } from '../context/Empleado.Context';
import { Button } from '@mui/material'; 
 import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
 import { ToastContainer, toast } from 'react-toastify';

const Empleado = () => {
    const { empleado, useIdFetch } = useEmpleado();
    
    const userid = JSON.parse(localStorage.getItem('userid'))
    const user = JSON.parse(localStorage.getItem('user'))  
    const { state: empleadoD} = useIdFetch(userid);
  
    return (
            <div>
            <h1>Capacitaciones de {user.name} </h1>
              <EmpleadoInfo empleadoD={empleadoD} />
          </div>
    )
  }
  const EmpleadoInfo = ({ empleadoD }) => {
    const { empleado, completar } = useEmpleado(); 
    const userid = JSON.parse(localStorage.getItem('userid'))
    
    function onSubmit(event) { 
        completar( userid)   
      };
       
    return (<div>
                          
{!empleadoD.capacitacion && <p>{'No tenes cargadas capacitaciones aun'}</p>}
       {empleadoD.capacitacion?.map(item => (<div>
       
         
            <ul>
                    <li > Titulo: {item.name}</li>
                    <li > Fecha de inicio de la Capacitación: {item.fechainicio}</li>
                    <li > Duración  de la Capacitación: {item.horas} horas</li>
                   

                    </ul>
                     
                        
                               
                    
{empleadoD.finalizado && empleadoD.finalizado == true && <p>{'Capacitacion Finalizada'} <CheckCircleOutlineIcon color="success" /></p>  }
 
{!empleadoD.finalizado  && <p>{<Button type="submit" 
          color="secondary" 
          variant="contained"  onClick={(event) => onSubmit(event)}>Marcar como completada</Button>}</p>}
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