import { useState,Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useEmpleados, EmpleadosProvider } from '../context/Empleados.Context';
import Empleado from './EmpleadoVistaAdmin';
import EliminarEmpleado from './EliminarEmpleado';
import CrearEmpleado from './CrearEmpleado';

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

export const EmpleadoList = () => {
const { empleados, } = useEmpleados();
return (
<div>
  <div id="icon-add-container">
    <IconButton color="success" size="large" aria-label="add">
      <Link to={`/empleados/nuevo`}>
      <AddIcon id="btn-add" />
      </Link>
    </IconButton>
  </div>
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>DNI</TableCell>
          <TableCell align="right">Nombre</TableCell>
          <TableCell align="right">Detalles</TableCell>
          <TableCell align="right">Editar</TableCell>
          <TableCell align="right">Capacitaciones</TableCell>
          <TableCell align="right">Eliminar</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

        {empleados?.map(empleado => (
        <TableRow key={empleado._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            {empleado.dni}
          </TableCell>
          <TableCell component="th" scope="row">
            {empleado.apellido} {empleado.name}
          </TableCell>
          <TableCell component="th" scope="row">
            <Link className="btn-detail" empleado={empleado} style={{"marginTop": "2em" }}
              to={`/empleados/${empleado._id}`}>Ver detalles</Link>
          </TableCell>
          <TableCell component="th" scope="row">
            <Link className="btn-detail" className="btn-detail" style={{"marginTop": "2em" }}
              to={`/empleados/${empleado._id}/edit`}> Editar </Link>
          </TableCell>
          <TableCell component="th" scope="row">
            <Link className="btn-detail" empleado={empleado} style={{"marginTop": "2em" }}
              to={`/empleados/assign/${empleado._id}`}>Asignar capacitacion</Link>
          </TableCell>
          <TableCell component="th" scope="row">
            <EliminarEmpleado empleado={empleado} />
          </TableCell>
        </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  <ToastContainer />
</div>
)
}


function EmpleadosPage(props) {
return (
<div>
  <h1>Empleados</h1>
  <EmpleadosProvider>
    <EmpleadoList />
  </EmpleadosProvider>
</div>
)
}
export default EmpleadosPage;