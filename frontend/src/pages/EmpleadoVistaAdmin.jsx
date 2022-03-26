import {useParams, Link} from 'react-router-dom'
import { useEffect, useState  } from 'react';
import { useEmpleados, EmpleadosProvider } from '../context/Empleados.Context';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
 
const Empleado = () => {
    const { empleados, useIdFetch } = useEmpleados();
    const { id } = useParams();
    const { state: empleado} = useIdFetch(id);
    return (
          <div>
            <EmpleadoInfo empleado={empleado} />
          </div>
    )
  }
  const EmpleadoInfo = ({ empleado }) => {
    const { empleados } = useEmpleados(); 

    return (<div>
      
      <h3>Id: {empleado._id}</h3>
      <p>nombre: {empleado.name}</p>
      <p>email: {empleado.email}</p>
      <p>dni: {empleado.dni}</p>
      <p>fecha de nacimiento: {empleado.fechanac}</p> 
       
      <CapacitacionEmpleado key={empleado._id} empleado={empleado}  className= "MuiButton-root btn MuiButton-contained MuiButton-containedSecondary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-zcbmsk-MuiButtonBase-root-MuiButton-root" 
       style={{"marginTop": "2em" }}
       />
          
          </div>
    ) 
}


function CapacitacionEmpleado(props)  {
  const { empleado  } = useEmpleados(); 
console.log( props.empleado )
  return (<div> 
     {props.empleado.capacitacion?.map(item => (<div>
       <h3>Capacitaciones del empleado</h3>
         
            <ul>
                    <li > Titulo: {item.name}</li>
                    <li > Fecha de inicio de la Capacitación: {item.fechainicio}</li>
                    <li > Duración  de la Capacitación: {item.horas} horas</li>
                                      
 
                    </ul>
       
     </div>
      ))}  
      {props.empleado.finalizado && props.empleado.finalizado == true && <p>{'Capacitacion Finalizada'}<CheckCircleOutlineIcon color="success" /></p> }
      
      {!props.empleado.finalizado && props.empleado.capacitacion && <p>{'Capacitacion no Finalizada'}</p>}
     
        </div>
  ) 
}

function GetEmpleado(props) {
    return (
    <div>
        <h2>Ver detalles del Empleado </h2>
        <EmpleadosProvider>
        <Empleado  />   
        </EmpleadosProvider>
    </div>
    )
}

export default GetEmpleado;