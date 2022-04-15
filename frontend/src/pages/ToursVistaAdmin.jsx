import { useState,Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTours, ToursProvider } from '../context/Tours.Context';
import Tour from './TourVistaAdmin';
import EliminarTour from './EliminarTour';
import CrearTour from './CrearTour';

import { ToastContainer, toast } from 'react-toastify';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton'; 

export const TourList = () => {  
  const { tours, } = useTours(); 
  return(<div>
     
 
  <div id="icon-add-container">
    <IconButton color="success" size="large" aria-label="add">
      <Link to={`/tours/nuevo`}>
      <AddIcon id="btn-add" />
      </Link>
    </IconButton>
  </div>
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow> 
          <TableCell align="right">Id</TableCell>
          <TableCell align="right">Titulo</TableCell>
          <TableCell align="right">Precio</TableCell>
          <TableCell align="right">Categoria</TableCell>  
          <TableCell align="right">Detalles</TableCell>  
          <TableCell align="right">Editar</TableCell>  
          <TableCell align="right">Eliminar</TableCell>  
        </TableRow>
      </TableHead>
      <TableBody>

        {tours?.map(tour => (
        <TableRow key={tour._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            {tour._id}
          </TableCell>
          <TableCell component="th" scope="row">
            {tour.titulo}  
          </TableCell>
          <TableCell component="th" scope="row">
            {tour.precioReserva }  
          </TableCell>
          <TableCell component="th" scope="row">
            {tour.categoria}  
          </TableCell>
          <TableCell component="th" scope="row">
            <Link className="btn-detail" tour={tour} style={{"marginTop": "2em" }}
              to={`/tours/${tour._id}`}>Ver detalles</Link>
          </TableCell>
          <TableCell component="th" scope="row">
            <Link className="btn-detail"  style={{"marginTop": "2em" }}
              to={`/tours/${tour._id}/edit`}> Editar </Link>
          </TableCell>
           
          <TableCell component="th" scope="row">
            <EliminarTour tour={tour} />
          </TableCell>
        </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  <ToastContainer />
 
  </div>)
 
}
 
function ToursPage(props) {
return (
<div>
  <h1>Tours</h1>
  <ToursProvider>
    <TourList />
  </ToursProvider>
</div>
)
}
export default ToursPage;