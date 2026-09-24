import { BrowserRouter, Route, Routes } from "react-router-dom";
import Produtos from './pages/Produtos';
import Planos from './pages/Planos';
import Perfil from './pages/Perfil';
import Login from './pages/Login';
import Gameficacao from './pages/Gameficacao';

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Produtos/>}/>
        <Route path="planos" element={<Planos/>}/>
        <Route path="perfil" element={<Perfil/>}/>
        <Route path="autenticacao" element={<Login/>}/>
        <Route path="gameficacao" element={<Gameficacao/>}/>
      </Routes>
    </BrowserRouter>
   );
}

export default App;