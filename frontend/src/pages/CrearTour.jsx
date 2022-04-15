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
titulo: yup.string().required('El nombre es obligatorio').min(3, 'El nombre debe tener al menos tres caracteres'),
descripcion: yup.string('la descripcion debe tener un formato valido').required('El email es obligatorio'),
fechaActividad: yup.date().typeError('La fecha de nacimiento debe estar en formato fecha') ,
precio: yup.number() 
});
function Create() {
const { register, handleSubmit, formState: { errors }, reset } = useForm({
resolver: yupResolver(schema),
});
const { tours, create } = useTours();
const [titulo, setTitulo] = useState('');
const [descripcion, setDescripcion] = useState('');
const [precio, setPrecio] = useState('');
const [idioma, setIdioma] = useState('');
const [duracion, setDuracion] = useState('');
const [categoria, setCategoria] = useState('');
const [fechaActividad, setFechaActividad] = useState('');
const userid = JSON.parse(localStorage.getItem('userid'))
const tour = {titulo, descripcion, precio,fechaActividad, idioma, duracion, categoria, userid}

const onSubmitHandler = data => {

create(tour)
console.log(data)
};

return (

<div className="create">

  <form className='formAssign' noValidate autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>

    <TextField required type="text" {...register("titulo")} id="outlined-required" label="Nombre del tour"
      onChange={(e)=> setTitulo(e.target.value)}
      defaultValue={titulo}


      /> <p className="is-danger">{errors.titulo?.message}</p>
      <TextField required type="text" {...register("descripcion")} id="outlined-required" label="Descripcion"
        onChange={(e)=> setDescripcion(e.target.value)}
        defaultValue={descripcion}


        /> <p className="is-danger">{errors.descripcion?.message}</p>





        <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} {...register("precioReserva")}
          id="outlined-required" label="Precio de la Reserva" onChange={(e)=> setPrecio(e.target.value)}
          defaultValue={precio}


          />
          <p className="is-danger">{errors.precioReserva?.message}</p>

          <TextField type="text" {...register("idioma")} id="outlined-required" label="Idioma" onChange={(e)=>
            setIdioma(e.target.value)}
            defaultValue={idioma}


            />
            <p className="is-danger">{errors.idioma?.message}</p>

            <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-12]*' }} {...register("duracion")}
              id="outlined-required" label="Duracion" onChange={(e)=> setDuracion(e.target.value)}
              defaultValue={duracion}


              />
              <p className="is-danger">{errors.duracion?.message}</p>


              <p className="is-danger">{errors.incluido?.message}</p>

              <TextField type="text" {...register("categoria")} id="outlined-required" label="Categoria" onChange={(e)=>
                setCategoria(e.target.value)}
                defaultValue={categoria}


                />

                <div
                  className='MuiFormControl-root MuiTextField-root css-1u3bzj6-MuiFormControl-root-MuiTextField-root'>
                  <div
                    className='calendario MuiOutlinedInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-formControl css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root'>

                    <label className='MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline'
                      htmlFor="fechaActividad">Fecha de Nacimiento del tour</label>
                    <input
                      className='MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input'
                      {...register("fechaActividad")} type="date" value={fechaActividad} required onChange={(e)=>
                    setFechaActividad(e.target.value)}/>
                    <p className="is-danger">{errors.fechaActividad?.message}</p>
                  </div>
                </div>


                <Button type="submit" color="secondary" variant="contained" endIcon={<SendIcon />}
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