import { createContext, useContext,   useState, useEffect } from "react";
import API from '../api/forgotpass.api'  
 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ForgotPassContext = createContext(); 
 
export function ForgotPassProvider(props) {
    const [forgotPass, setForgotPass] = useState() 
   
  const sendResetEmail = async (email) => {
         
    toast.success('Se envio un correo a tu casilla para que resetees la clave')
    return API.forgotPassword(email)
      
}   
    return (
                <ForgotPassContext.Provider value={{  forgotPass, sendResetEmail }}>
            {props.children}
        </ForgotPassContext.Provider>
    );
}

export function useForgotPass() {
    const context = useContext(ForgotPassContext);
    if (context === undefined) {
        throw new Error("useForgotPass must be used within a ForgotPassProvider");
    }
    return context;
}

