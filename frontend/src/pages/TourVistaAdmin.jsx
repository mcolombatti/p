import {useParams, Link} from 'react-router-dom'
import { useEffect, useState  } from 'react';
import { useTours, ToursProvider } from '../context/Tours.Context';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
 
const Tour = () => {
    const { tours, useIdFetch } = useTours();
    const { id } = useParams();
    const { state: tour} = useIdFetch(id);
    return (
          <div>
            <TourInfo tour={tour} />
          </div>
    )
  }
  const TourInfo = ({ tour }) => {
    const { tours } = useTours(); 

    return (<div>
      
      <h3>Id: {tour._id}</h3>
      <p>nombre: {tour.name}</p>
      <p>email: {tour.email}</p>
      <p>dni: {tour.dni}</p>
      <p>fecha de nacimiento: {tour.fechanac}</p> 
       
      <CapacitacionTour key={tour._id} tour={tour}  className= "MuiButton-root btn MuiButton-contained MuiButton-containedSecondary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-zcbmsk-MuiButtonBase-root-MuiButton-root" 
       style={{"marginTop": "2em" }}
       />
          
          </div>
    ) 
}


function CapacitacionTour(props)  {
  const { tour  } = useTours(); 
console.log( props.tour )
  return (<div> 
     {props.tour.capacitacion?.map(item => (<div>
       <h3>Capacitaciones del tour</h3>
         
            <ul>
                    <li > Titulo: {item.name}</li>
                    <li > Fecha de inicio de la Capacitación: {item.fechainicio}</li>
                    <li > Duración  de la Capacitación: {item.horas} horas</li>
                                      
 
                    </ul>
       
     </div>
      ))}  
      {props.tour.finalizado && props.tour.finalizado == true && <p>{'Capacitacion Finalizada'}<CheckCircleOutlineIcon color="success" /></p> }
      
      {!props.tour.finalizado && props.tour.capacitacion && <p>{'Capacitacion no Finalizada'}</p>}
     
        </div>
  ) 
}

function GetTour(props) {
    return (
    <div>
        <h2>Ver detalles del Tour </h2>
        <ToursProvider>
        <Tour  />   
        </ToursProvider>
    </div>
    )
}

export default GetTour;