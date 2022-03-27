import { createContext, useContext, useState, useEffect } from "react";
import API from '../api/tours.api' 
 
import {   useNavigate  } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToursContext = createContext(); 

export function ToursProvider(props) {
    const [tours, setTours] = useState()
     
 
  let navigate = useNavigate();
    useEffect(() => {
    
      API.getTours()
        .then(data => {
            setTours(data);
        })
        
     }
        
       , []);
    
    const remove = async (tour) => {
        setTours(tours.filter(p => p._id !== tour._id))
        return API.deleteTour(tour._id)
        .then(()=>{

          toast.success('Se elimino con exito el tour')
        })
        .catch(() => {   
            
        toast.error('Hubo un problema al eliminar el tour')
            throw new Error('Error al eliminar el tour');
        });
    } 
     
    const create = async (tour) => {
         
          
            return API.createTour(tour)
            .then(()=>{

              toast.success('Se creo con exito el tour') 
               navigate('/tours')
            })
            .catch(() => {   
                
      toast.error('Hubo un problema al crear el tour')
                throw new Error('Error al crear el tour');
            });
    }  
    const edit = async (id, tour) => {
         
          
            return API.editTour(id, tour).then(()=>{

              toast.success('Se actualizo con exito el tour') 
               navigate('/tours')
            })
            .catch(() => {   
                
      toast.error('Hubo un problema al actualizar el tour')
                throw new Error('Error al actualizar el tour');
            });
    }  

      const useIdFetch = Tourid => {
        const [state, setState] = useState({});
        
        useEffect(() => {
          const fetchTour = async () => {
            try {
             
              const tour = await API.getTourDetails(Tourid);
            
              setState({
                ...tour,
                  });
      
               } catch (error) {
             console.log(error)
            }
          };
      
      
          fetchTour();
        }, [Tourid]);
      
       
      
        return { state  };
      }; 
       
 
    return (
                <ToursContext.Provider value={{ tours,  edit, setTours, remove, create, useIdFetch }}>
            {props.children}
        </ToursContext.Provider>
    );
}

export function useTours() {
    const context = useContext(ToursContext);
    if (context === undefined) {
        throw new Error("useTours must be used within a ToursProvider");
    }
    return context;
}

