import { useState } from 'react';
import { useBeneficios, BeneficiosProvider } from '../context/Beneficios.Context';
import { Button } from '@mui/material'; 
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import SendIcon from '@mui/icons-material/Send';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  titulo: yup.string().required("El titulo es obligatorio").min(3, 'El titulo tiene que tener al menos 3 caracteres').max(70, 'el titulo no puede superar los 70 caracteres'),
  descripcion: yup.string().required("la descripcion es obligatorio").min(3, 'El titulo tiene que tener al menos 3 caracteres').max(150, 'la descripcion no puede superar los 150 caracteres'),
  categoria: yup.string().required("Es obligatorio ingresar una categoria ").min(3, 'La categoría tiene que tener al menos 3 caracteres').max(75, 'La categoría no puede superar los 75 caracteres'),
  fechavenc: yup.date('la fecha de nacimiento tiene que ser una fecha'),

});
function Create() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
const { beneficios, create } = useBeneficios();
const [titulo, setTitulo] = useState('');
const [descripcion, setDescripcion] = useState('');
const [categoria, setCategoria] = useState(''); 
const [fechavenc, setFechavenc] = useState(''); 
 const beneficio = {titulo, descripcion, categoria, fechavenc}
 
const onSubmitHandler = data => {
  create(beneficio) 
  console.log(data)
};
 
return (
    
<div className="create"> 

    <form className='formAssign' noValidate autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
 
    <TextField
          required type="text"
          {...register("titulo")}
          
          id="outlined-required" required
          label="Nombre del Beneficio"onChange={(e)=> setTitulo(e.target.value)}
          defaultValue={titulo}
          
          
        />                    <p className="is-danger">{errors.titulo?.message}</p> 
      
    <TextField
          required type="text"
          {...register("descripcion")}
          
          id="outlined-required" required
          label="Descripcion  del Beneficio"onChange={(e)=> setDescripcion(e.target.value)}
          defaultValue={descripcion}
          
          
        />                    <p className="is-danger">{errors.descripcion?.message}</p> 
          
     
    <TextField
          required type="text"
          {...register("categoria")}
          
          id="outlined-required" required
          label="Categoria"onChange={(e)=> setCategoria(e.target.value)}
          defaultValue={categoria}
          
          
        />                    <p className="is-danger">{errors.categoria?.message}</p> 
         
             
    <TextField 
          {...register("fechavenc")}
          type="date"
          id="outlined-required" required
          label="date"onChange={(e)=> setFechavenc(e.target.value)}
          defaultValue={fechavenc}
          
          
        />       
      <p  className="is-danger">{errors.fechavenc?.message}</p>
       
   
         
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
    <h2>Crear un Beneficio</h2>
    <BeneficiosProvider>
        <Create />
    </BeneficiosProvider>
</div>
)
}
export default CreatePage;