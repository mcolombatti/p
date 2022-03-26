import { createContext, useContext,   useState, useEffect } from "react";
import API from '../api/beneficios.api'  
import {   useNavigate  } from 'react-router-dom'; 
  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BeneficiosContext = createContext(); 
 
export function BeneficiosProvider(props) {
    const [beneficios, setBeneficios] = useState() 
  
 
    let navigate = useNavigate();
    const remove = async (beneficio) => {
      setBeneficios(beneficios.filter(p => p._id !== beneficio._id))
      return API.deleteBeneficio(beneficio._id)
      .then(()=>{

        toast.success('Se elimino con exito el beneficio')
      })
      .catch(() => {   
          
toast.error('Hubo un problema al eliminar el beneficio')
          throw new Error('Error al eliminar el beneficio');
      });
  } 
  const create = async (beneficio) => {
         
          
    return API.createBeneficio(beneficio)  
    .then(()=>{

        toast.success('Se creo con exito el beneficio') 
         navigate('/lista-beneficios')
      })
      .catch(() => {   
          
toast.error('Hubo un problema al crear el beneficio')
          throw new Error('Error al crear el beneficio');
      });
      
      
}  
    const fetchAll = async () => {
     
 
    
        return API.getBeneficios()
     
        .then(data => {
          setBeneficios(data);
        })

    }  
 
    return (
                <BeneficiosContext.Provider value={{ beneficios, create,setBeneficios, fetchAll,  remove }}>
            {props.children}
        </BeneficiosContext.Provider>
    );
}

export function useBeneficios() {
    const context = useContext(BeneficiosContext);
    if (context === undefined) {
        throw new Error("useBeneficios must be used within a BeneficiosProvider");
    }
    return context;
}

