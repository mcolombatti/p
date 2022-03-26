 
import {useState, useEffect } from 'react'
import {   Link} from 'react-router-dom'
import { useAuth } from '../context/Auth.Context'
function Home(props){ 
    
  const auth = useAuth()
  const [userName, setUserName] = useState('');
    useEffect(() => {
        if (localStorage.getItem('user')){
          const user = JSON.parse(localStorage.getItem('user'))
          auth.dispatch({ type: 'LOGIN', payload: user })
          setUserName(user.name)  
           
        }
      }, []) 
 
    return (
        <div>
            <h1>¡Hola {userName}!</h1>

            <p>El portal HR Connect vas a poder encontrar toda la información que necesitás de tu trabajo.</p>
        <p>Vas a poder acceder a tus capacitaciones, beneficios y mucho más.</p>
        
        </div>
    )
}
export default Home;