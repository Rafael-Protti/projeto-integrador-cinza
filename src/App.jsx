import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Produtos from './pages/Produtos';
import Planos from './pages/Planos';
import Perfil from './pages/Perfil';
import Gameficacao from './pages/Gameficacao';
import Login from "./pages/login";

function RotaProtegida({ children }) {
  return localStorage.getItem('usuarioId') || sessionStorage.getItem('usuarioId')
    ? children
    : <Navigate to="/login" replace />;
}

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Produtos/>}/>
        <Route path="planos" element={<Planos/>}/>
        <Route path="perfil" element={<RotaProtegida><Perfil/></RotaProtegida>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="gameficacao" element={<Gameficacao/>}/>
      </Routes>
    </BrowserRouter>
   );
}

export default App;