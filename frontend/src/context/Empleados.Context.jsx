import { createContext, useContext, useState, useEffect } from "react";
import API from '../api/empleado.api' 
 
import {   useNavigate  } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmpleadosContext = createContext(); 

export function EmpleadosProvider(props) {
    const [empleados, setEmpleados] = useState()
     
 
  let navigate = useNavigate();
    useEffect(() => {
    
        fetch(`http://localhost:9001/api/empleados/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${localStorage.getItem('token')}`
            }
        })
        .then(res => {
          return res.json();
        })
        .then(data => {
            setEmpleados(data);
        })
        
     }
        
       , []);
    
    const remove = async (empleado) => {
        setEmpleados(empleados.filter(p => p._id !== empleado._id))
        return API.deleteEmpleado(empleado._id)
        .then(()=>{

          toast.success('Se elimino con exito el empleado')
        })
        .catch(() => {   
            
        toast.error('Hubo un problema al eliminar el empleado')
            throw new Error('Error al eliminar el empleado');
        });
    } 
    const agregarFav = async (userId, beneficio) => {
           
            
      return API.agregarBeneficioFavoritos(userId,beneficio)
      .then(()=>{

        toast.success('¡Beneficio agregado a favoritos!') 
      })
      .catch(() => {   
          
  toast.error('Hubo un problema al agregar el beneficio a favoritos ')
          throw new Error('Error al agregar el beneficio a favoritos ');
      });
  }  
    const create = async (empleado) => {
         
          
            return API.createEmpleado(empleado)
            .then(()=>{

              toast.success('Se creo con exito el empleado') 
               navigate('/empleados')
            })
            .catch(() => {   
                
      toast.error('Hubo un problema al crear el empleado')
                throw new Error('Error al crear el empleado');
            });
    }  
    const edit = async (id, empleado) => {
         
          
            return API.editEmpleado(id, empleado).then(()=>{

              toast.success('Se actualizo con exito el empleado') 
               navigate('/empleados')
            })
            .catch(() => {   
                
      toast.error('Hubo un problema al actualizar el empleado')
                throw new Error('Error al actualizar el empleado');
            });
    }  

      const useIdFetch = Empleadoid => {
        const [state, setState] = useState({});
        
        useEffect(() => {
          const fetchEmpleado = async () => {
            try {
             
              const empleado = await API.getEmpleadoDetails(Empleadoid);
            
              setState({
                ...empleado,
                  });
      
               } catch (error) {
             console.log(error)
            }
          };
      
      
          fetchEmpleado();
        }, [Empleadoid]);
      
       
      
        return { state  };
      }; 
       
const assign = async (id, capacitacion) => {
    return API.assignCapacitacionEmpleado(id, capacitacion)
    .then(()=>{

      toast.success('Se creo con exito la capacitacion del empleado')
      navigate('/empleados')
    })
    .catch(() => {   
        
toast.error('Hubo un problema al crear la capacitacion del empleado')
        throw new Error('Error al  crear la capacitacion del empleado');
    });
   
  }
    return (
                <EmpleadosContext.Provider value={{ empleados, agregarFav, edit, setEmpleados, remove, create, useIdFetch, assign}}>
            {props.children}
        </EmpleadosContext.Provider>
    );
}

export function useEmpleados() {
    const context = useContext(EmpleadosContext);
    if (context === undefined) {
        throw new Error("useEmpleados must be used within a EmpleadosProvider");
    }
    return context;
}

