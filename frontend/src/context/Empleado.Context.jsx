import { createContext, useContext, useState, useEffect } from "react";
import API from '../api/empleado.api' 
 
import { ToastContainer, toast } from 'react-toastify';
import {   useNavigate  } from 'react-router-dom';

const EmpleadoContext = createContext(); 


export function EmpleadoProvider(props) {
    const [empleado, setEmpleado] = useState()
     
  let navigate = useNavigate();
 

      const useIdFetch = (Empleadoid) => {
        const [state, setState] = useState({});
        console.log(Empleadoid)
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
       
      const completar = async (id ) => {
         
          
        return API.completarCapacitacion(id )
        .then(()=>{

          toast.success('¡Capacitacion completada!') 
        })
        .catch(() => {   
            
    toast.error('Hubo un problema al completar la capacitacion ')
            throw new Error('Error al completar la capacitacion ');
        });
}  
       
    return (
                <EmpleadoContext.Provider value={{ empleado, setEmpleado, completar, useIdFetch}}>
            {props.children}
        </EmpleadoContext.Provider>
    );
}

export function useEmpleado() {
    const context = useContext(EmpleadoContext);
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductsProvider");
    }
    return context;
}

