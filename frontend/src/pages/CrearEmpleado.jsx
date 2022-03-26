import { useState } from 'react';
import { useEmpleados, EmpleadosProvider } from '../context/Empleados.Context';
import { Button } from '@mui/material'; 
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import SendIcon from '@mui/icons-material/Send';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio').min(3,  'El nombre debe tener al menos tres caracteres'), 
  apellido: yup.string().required('El apellido es obligatorio').min(3, 'El apellido debe tener al menos tres caracteres'), 
  email: yup.string().email('El email debe tener un formato valido').required('El email es obligatorio').typeError('El mail debe tener un formato valido'),
  fechanac: yup.date().typeError('La fecha de nacimiento debe estar en formato fecha') ,

  dni: yup.number()
  .typeError('El DNI debe estar compuesto por numeros unicamente').required()
});
function Create() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
const { empleados, create } = useEmpleados();
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [dni, setDni] = useState(''); 
const [apellido, setApellido] = useState('');
const [fechanac, setFechaNac] = useState('');
 const empleado = {name, email, dni,fechanac,apellido}
 
const onSubmitHandler = data => {
  create(empleado) 
  console.log(data)
};
 
return (
    
<div className="create"> 

    <form className='formAssign' noValidate autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
 
    <TextField
          required type="text"
          {...register("name")}
          
          id="outlined-required" required
          label="Nombre del Empleado"onChange={(e)=> setName(e.target.value)}
          defaultValue={name}
          
          
        />                    <p className="is-danger">{errors.name?.message}</p> 
      
    <TextField
          required type="text"
          {...register("apellido")}
          
          id="outlined-required" required
          label="Apellido  del Empleado"onChange={(e)=> setApellido(e.target.value)}
          defaultValue={apellido}
          
          
        />                    <p className="is-danger">{errors.apellido?.message}</p> 
          
     
    <TextField
          required type="email"
          {...register("email")}
          
          id="outlined-required" required
          label="Email"onChange={(e)=> setEmail(e.target.value)}
          defaultValue={email}
          
          
        />                    <p className="is-danger">{errors.email?.message}</p> 
         
             
    <TextField
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
          {...register("dni")}
          
          id="outlined-required" required
          label="dni"onChange={(e)=> setDni(e.target.value)}
          defaultValue={dni}
          
          
        />       
      <p  className="is-danger">{errors.dni?.message}</p>
       
    
<div className='MuiFormControl-root MuiTextField-root css-1u3bzj6-MuiFormControl-root-MuiTextField-root'>
             <div className='calendario MuiOutlinedInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-formControl css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root'>
               
                         <label className='MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline' htmlFor="fechanac">Fecha de Nacimiento del Empleado</label>
                         <input className='MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input' {...register("fechanac")} type="date" value={fechanac}  required onChange={(e)=> setFechaNac(e.target.value)}/>
                           <p  className="is-danger">{errors.fechanac?.message}</p>
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
    <h2>Crear un Empleado</h2>
    <EmpleadosProvider>
        <Create />
    </EmpleadosProvider>
</div>
)
}
export default CreatePage;