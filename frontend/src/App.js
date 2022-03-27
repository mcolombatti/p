import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import CrearTour from './pages/CrearTour'
import TourEdit from './pages/TourEdit'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Tours from './pages/ToursVistaAdmin';
import DetailsTour from './pages/TourVistaAdmin';
import Home from './pages/Home'
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
                  <NavRole> <Button color="inherit"> <Link to="/tours">Tours</Link></Button></NavRole>
                   <Button color="inherit"> <Link to="/">Home</Link></Button>
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

          <Route path="/tours" element={
            <AuthRoute> <AuthRole><Tours /></AuthRole></AuthRoute>
          } />
          
          <Route path="/tours/nuevo" element={
            <AuthRoute><CrearTour /></AuthRoute>
          } /> 
         
          <Route path="/tours/:id" element={<AuthRoute><DetailsTour /></AuthRoute>} />
          <Route path="/tours/:id/edit"   element={<AuthRoute><TourEdit /></AuthRoute>} />
          
          <Route path="/404" element={<h1>Sitio no encontrado</h1>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
