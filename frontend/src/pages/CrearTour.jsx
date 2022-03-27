import { useState } from 'react';
import { useTours, ToursProvider } from '../context/Tours.Context';
import { Button } from '@mui/material'; 
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import SendIcon from '@mui/icons-material/Send';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object().shape({
  titulo: yup.string().required('El nombre es obligatorio').min(3,  'El nombre debe tener al menos tres caracteres'), 
  descripcion: yup.string('la descripcion debe tener un formato valido').required('El email es obligatorio').typeError('El mail debe tener un formato valido'),
  cancelacion: yup.boolean(),
  fechaActividad: yup.date().typeError('La fecha de nacimiento debe estar en formato fecha') ,

  precioReserva: yup.number()
  .typeError('El DNI debe estar compuesto por numeros unicamente').required()
});
function Create() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
const { tours, create } = useTours();
const [titulo, setTitulo] = useState('');
const [descripcion, setDescripcion] = useState('');
const [cancelacion, setCancelacion] = useState('');
const [precioReserva, setPrecioReserva] = useState(''); 
const [idioma, setIdioma] = useState(''); 
const [duracion, setDuracion] = useState(''); 
const [incluido, setIncluido] = useState(''); 
const [categoria, setCategoria] = useState(''); 
const [fechaActividad, setFechaActividad] = useState('');
const [horaActividad, setHoraActividad] = useState('');
const [minutosActividad, setMinutosActividad] = useState('');
 const tour = {titulo, descripcion, precioReserva,fechaActividad,cancelacion,horaActividad, minutosActividad, categoria, incluido, idioma,duracion}
 
const onSubmitHandler = data => {
  create(tour) 
  console.log(data)
};
 
return (
    
<div className="create"> 

    <form className='formAssign' noValidate autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
 
    <TextField
          required type="text"
          {...register("titulo")}
          
          id="outlined-required" 
          label="Nombre del tour"onChange={(e)=> setTitulo(e.target.value)}
          defaultValue={titulo}
          
          
        />                    <p className="is-danger">{errors.titulo?.message}</p> 
       <TextField
          required type="text"
          {...register("descripcion")}
          
          id="outlined-required" 
          label="Descripcion"onChange={(e)=> setDescripcion(e.target.value)}
          defaultValue={descripcion}
          
          
        />                    <p className="is-danger">{errors.descripcion?.message}</p> 



<Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth> 
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cancelacion}  {...register("cancelacion")}  defaultValue={cancelacion}
          label="Cancelacion"
          onChange={(e)=> setCancelacion(e.target.value)}
        >
          <MenuItem value={true}>Cancelable</MenuItem>
          <MenuItem value={false}>No Cancelable</MenuItem> 
        </Select>
      </FormControl>
    </Box>

       
             <p className="is-danger">{errors.cancelacion?.message}</p>  
          
     
   
    <TextField
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
          {...register("precioReserva")}
          
          id="outlined-required" 
          label="Precio de la Reserva"onChange={(e)=> setPrecioReserva(e.target.value)}
          defaultValue={precioReserva}
          
          
        />       
      <p  className="is-danger">{errors.precioReserva?.message}</p>
        
        <TextField
          type="text"
          {...register("idioma")}
          
          id="outlined-required" 
          label="Idioma"onChange={(e)=> setIdioma(e.target.value)}
          defaultValue={idioma}
          
          
        />       
      <p  className="is-danger">{errors.idioma?.message}</p>
          
        <TextField
           inputProps={{ inputMode: 'numeric', pattern: '[0-12]*' }}
          {...register("duracion")}
          
          id="outlined-required" 
          label="Duracion"onChange={(e)=> setDuracion(e.target.value)}
          defaultValue={duracion}
          
          
        />       
      <p  className="is-danger">{errors.duracion?.message}</p>
          
      <TextField
          type="array"
          {...register("incluido")}
          
          id="outlined-required" 
          label="Incluido"onChange={(e)=> setIncluido(e.target.value)}
          defaultValue={incluido}
          
          
        />       
      <p  className="is-danger">{errors.incluido?.message}</p>
                 
      <TextField
          type="text"
          {...register("categoria")}
          
          id="outlined-required" 
          label="Categoria"onChange={(e)=> setCategoria(e.target.value)}
          defaultValue={categoria}
          
          
        />       
      <p  className="is-danger">{errors.categoria?.message}</p>
                     
      <TextField
          inputProps={{ inputMode: 'numeric', pattern: '[0-23]*' }}
          {...register("horaActividad")}
          
          id="outlined-required" 
          label="Hora de la Actividad"onChange={(e)=> setHoraActividad(e.target.value)}
          defaultValue={horaActividad}
          
          
        />       
      <p  className="is-danger">{errors.horaActividad?.message}</p>
           <TextField
          inputProps={{ inputMode: 'numeric', pattern: '[0-59]*' }}
          {...register("minutosActividad")}
          
          id="outlined-required" 
          label="Minutos de la Actividad"onChange={(e)=> setMinutosActividad(e.target.value)}
          defaultValue={minutosActividad}
          
          
        />       
      <p  className="is-danger">{errors.minutosActividad?.message}</p>
          
    
<div className='MuiFormControl-root MuiTextField-root css-1u3bzj6-MuiFormControl-root-MuiTextField-root'>
             <div className='calendario MuiOutlinedInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-formControl css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root'>
               
                         <label className='MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline' htmlFor="fechaActividad">Fecha de Nacimiento del tour</label>
                         <input className='MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input' {...register("fechaActividad")} type="date" value={fechaActividad}  required onChange={(e)=> setFechaActividad(e.target.value)}/>
                           <p  className="is-danger">{errors.fechaActividad?.message}</p>
             </div>
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


function CreatePage(props) {
return (
<div>
    <h2>Crear un tour</h2>
    <ToursProvider>
        <Create />
    </ToursProvider>
</div>
)
}
export default CreatePage;