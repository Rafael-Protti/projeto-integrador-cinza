import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Planos from './pages/Planos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Planos />
  </StrictMode>,
)
