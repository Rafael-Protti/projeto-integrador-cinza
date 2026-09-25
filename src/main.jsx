import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
/*import Perfil from ./Perfil.jsx */ 
/* import Login from ./Login.jsx */ 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/> 
  </StrictMode> 

 /* <Login/> */
 /* <Perfil/> */
)
