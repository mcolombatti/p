import { useState } from 'react';
import { useEmpleados, EmpleadosProvider } from '../context/Empleados.Context'; 
import TextField from '@mui/material/TextField';
import {useParams} from 'react-router-dom' 
import { Button } from '@mui/material';  
import { useForm } from "react-hook-form";
import SendIcon from '@mui/icons-material/Send';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required('El titulo de la capacitacion es obligatorio').min(3),  
  fechainicio: yup.date().typeError('La fecha de nacimiento debe estar en formato fecha') ,

  horas: yup.number().required()
  .typeError('La duración debe estar compuesta por numeros unicamente')
}); 

function Assign() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
const { empleados, assign } = useEmpleados(); 
const { id } = useParams(); 
const [name, setName] = useState('');
const [horas, setHoras] = useState('');
const [fechainicio, setFechaInicio] = useState(''); 
const capacitacion = {name, horas, fechainicio };

const onSubmitHandler = data => {
  assign(id, capacitacion) 
  console.log(data)
}; 
return (
    
<div className="create"> 

    <form class='formAssign' noValidate autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
 
    <TextField
          required type="text"
          {...register("name")}
          
          id="outlined-required" required
          label="Título de la capacitacion"onChange={(e)=> setName(e.target.value)}
          defaultValue={name}
/>
                            <p className="is-danger">{errors.name?.message}</p> 
   
  
             
    <TextField
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
          {...register("horas")}
          
          id="outlined-required" required
          label="Duracion total de la capacitacion (en)"onChange={(e)=> setHoras(e.target.value)}
          defaultValue={horas}
          
          
        /> 
         <p className="is-danger">{errors.horas?.message}</p>
            <div className='calendario MuiFormControl-root MuiTextField-root css-1u3bzj6-MuiFormControl-root-MuiTextField-root'>
             <div className='MuiOutlinedInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-formControl css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root'>
               
                         <label className=' MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline' htmlFor="fechainicio">Fecha Inicio de la capacitación</label>
                         <input className='MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input' {...register("fechainicio")} type="date" value={fechainicio}  required onChange={(e)=> setFechaInicio(e.target.value)}/>
                          
             </div>
             <p className="is-danger">{errors.fechainicio?.message}</p>
        </div>
         
        <Button
          type="submit" 
          color="secondary" 
          variant="contained"  
          endIcon={<SendIcon />}
          >
          Confirmar
        </Button>
        
     
      </form>
</div>
)
}


function AssignCapacitacion(props) {
return (
<div>
    <h2>Asignar Capacitacion</h2>
    <EmpleadosProvider>
        <Assign />
    </EmpleadosProvider>
</div>
)
}
export default AssignCapacitacion;
 
 
 
 ;