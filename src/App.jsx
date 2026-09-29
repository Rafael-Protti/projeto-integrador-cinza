import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Produtos from './pages/Produtos';
import Planos from './pages/Planos';
import Perfil from './pages/Perfil';
import Login from "./pages/login";
import Gameficacao from './pages/Gameficacao';
import Navbar from './navbar';
import Rodape from './rodape';

function Layout({ mostrarNavbar = true, children }) {
  const navigate = useNavigate();
  const onNavigate = (pagina) => navigate(`/${pagina}`);

  return (
    <>
      {mostrarNavbar && <Navbar onNavigate={onNavigate} />}
      {children || <Outlet />}
      <Rodape onNavigate={onNavigate} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Produtos />} />
          <Route path="planos" element={<Planos />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="gameficacao" element={<Gameficacao />} />
        </Route>
        <Route path="login" element={<Layout mostrarNavbar={false}><Login /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;