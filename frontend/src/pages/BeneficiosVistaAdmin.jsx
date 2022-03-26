import { useState,Fragment, useContext, useEffect  } from 'react'; 
import { useBeneficios, BeneficiosProvider } from '../context/Beneficios.Context'; 
import { Link} from 'react-router-dom'
import EliminarBeneficio from './EliminarBeneficio';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

export const BeneficiosListItem = (props) => {  
  const [error, setError] = useState('');
  
  return (
  
    
        <TableRow
              key={props.beneficio._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {props.beneficio._id}
              </TableCell>
              <TableCell component="th" scope="row">
              {props.beneficio.titulo}
              </TableCell> 
              <TableCell component="th" scope="row">
              {props.beneficio.categoria}
              </TableCell>
           
              <TableCell component="th" scope="row">
                <EliminarBeneficio beneficio={props.beneficio} /> 
                 </TableCell>
             
               </TableRow>
    
  )
}
export const BeneficiosList = (props) =>  {
    const { beneficios, fetchAll} = useBeneficios(); 
  useEffect(() => {
    
    fetchAll() 
     
 }
 
    
   , []);
   
   

     return (
          
           <div>  
             <div id="icon-add-container">
    <IconButton color="success" size="large" aria-label="add">
      <Link to={`/beneficios/nuevo`}>
      <AddIcon id="btn-add" />
      </Link>
    </IconButton>
          </div>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Titulo</TableCell> 
            <TableCell align="right">Categoria</TableCell> 
            <TableCell align="right"> </TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
        
          {beneficios?.map(beneficio => (
             <BeneficiosListItem key={beneficio._id} beneficio={beneficio} />
          
          ))}
        </TableBody>
      </Table>
            </TableContainer>
          
        </div>
         
     )
}
 

function BeneficiosPage(props) {
    return (
        <div>
            <h1>Beneficios</h1>
            <BeneficiosProvider >
                <BeneficiosList /> 
            </BeneficiosProvider>
        </div>
    )
}
export default BeneficiosPage;