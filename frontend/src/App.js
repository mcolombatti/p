import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import CrearBeneficio from './pages/CrearBeneficio'
import CrearEmpleado from './pages/CrearEmpleado'
import CapacitacionesEmpleado from './pages/CapacitacionesEmpleado'
import EmpleadoEdit from './pages/EmpleadoEdit'
import AssignCapacitacion from './pages/AsignarCapacitacion'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Empleados from './pages/EmpleadosVistaAdmin';
import DetailsEmpleado from './pages/EmpleadoVistaAdmin';
import Beneficios from './pages/BeneficiosVistaEmpleado'
import BeneficiosAdmin from './pages/BeneficiosVistaAdmin'
import Home from './pages/Home'
import BeneficiosFav from './pages/BeneficiosFav'
import { useAuth } from './context/Auth.Context'
import { style } from '@mui/system';

import { useParams } from 'react-router-dom'

function AuthRoute({ children }) {
  const { state } = useAuth()
  return state.isAuthenticated ? children : <Navigate to="/login" />
}

function AuthRole({ children }) {
  const { state } = useAuth()
  return (state.user.rol == 'admin') ? children : <Navigate to="/login" />
}

function NavAuth({ children }) {
  const { state } = useAuth()
  return state.isAuthenticated ? children : null
}
function NoNavAuth({ children }) {
  const { state } = useAuth()

  return state.isAuthenticated ? null : children
}

function NavRole({ children }) {
  const { state } = useAuth()
  return (state.user.rol == 'admin') ? children : null
}
function NoNavRole({ children }) {
  const { state } = useAuth()
  return (state.user.rol != 'admin') ? children : null
}




function App(props) {
  const auth = useAuth()
  const [userName, setUserName] = useState('');
  let navigate = useNavigate();
  const { param } = useParams("/reset-password/:id/:token");


  useEffect(() => {
    if (auth.state.isAuthenticated) {

      navigate('/')
    }
  }, [auth.state])

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'))
      auth.dispatch({ type: 'LOGIN', payload: user })
      const userid = JSON.parse(localStorage.getItem('userid'))
      auth.dispatch({ type: 'USERID', payload: userid })
      setUserName(user.name)
      console.log(user.name)

    }
  }, [])



  return (
    <div className="App">

      <div >

        <Box sx={{ flexGrow: .1 }} className="links">
          <AppBar position="static">
            <Toolbar style={{ "display": "flex", "flexDirection": "row", "flexWrap": "wrap", "justifyContent": "space-between", "alignItems": "center" }}>

              <Typography component="div" sx={{ flexGrow: .1 }}>
                <h1 variant="h4" id="logo">HR Connect</h1>
              </Typography>
              <div>
                <NoNavAuth>
                  <Button color="inherit"> <Link to="/">Home</Link></Button>
                  <Button color="inherit"> <  Link to="/registrarse">Registrarse</Link></Button>
                  <Button color="inherit"> <Link to="/login">Login</Link></Button>

                </NoNavAuth>
                <NavAuth>
                  <NavRole> <Button color="inherit"> <Link to="/empleados">Empleados</Link></Button></NavRole>
                  <NavRole> <Button color="inherit"><Link to="/lista-beneficios">Beneficios</Link></Button></NavRole>
                  <Button color="inherit"> <Link to="/">Home</Link></Button>
                  <NoNavRole><Button color="inherit"> <Link to="/empleado/capacitaciones">Capacitaciones</Link></Button></NoNavRole>
                  <NoNavRole><Button color="inherit"> <Link to="/beneficios/favoritos">Mis favoritos</Link></Button></NoNavRole>
                  <NoNavRole><Button color="inherit"> <Link to="/beneficios">Beneficios</Link></Button></NoNavRole>
                   <Logout /> 

                </NavAuth>
              </div>
            </Toolbar>
          </AppBar>
        </Box>


      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrarse" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id/:token" element={<ResetPassword />} />

          <Route path="/empleados" element={
            <AuthRoute> <AuthRole><Empleados /></AuthRole></AuthRoute>
          } />
          <Route path="/lista-beneficios" element={
            <AuthRoute> <AuthRole><BeneficiosAdmin /></AuthRole></AuthRoute>
          } />
          <Route path="/empleados/nuevo" element={
            <AuthRoute><CrearEmpleado /></AuthRoute>
          } /> <Route path="/beneficios/nuevo" element={
            <AuthRoute><CrearBeneficio /></AuthRoute>
          } />
          <Route path="/beneficios" element={<AuthRoute><Beneficios /></AuthRoute>} />
          <Route path="/beneficios/favoritos" element={<AuthRoute><BeneficiosFav /></AuthRoute>} />
          <Route path="/empleados/:id" element={<AuthRoute><DetailsEmpleado /></AuthRoute>} />
          <Route path="/empleados/:id/edit"   element={<AuthRoute><EmpleadoEdit /></AuthRoute>} />
          <Route path="/empleados/assign/:id" element={<AuthRoute><AssignCapacitacion /></AuthRoute>} />
          <Route path="/empleado/capacitaciones" element={<AuthRoute><CapacitacionesEmpleado /></AuthRoute>} /> 
          <Route path="/404" element={<h1>Sitio no encontrado</h1>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
