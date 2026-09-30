import React from 'react';
import './navbar.css';
import logo from '../docs/docs_antigos/Logo.png';

function Navbar({ onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button type="button" className="navbar-logo" onClick={() => onNavigate('perfil')}>
          <img
            src={logo}
            alt="Logo XP Shop"
            className="navbar-logo-imagem"
          />
          <span>XP SHOP</span>
        </button>

        <div className="navbar-pesquisa">
          <input type="text" placeholder="Digite para pesquisa..." className="navbar-input" />
          <i className="fas fa-search navbar-icone-pesquisa"></i>
        </div>

        <div className="navbar-acoes">
          <button className="navbar-btn-icone" title="Notificações">
            <i className="fas fa-bell"></i>
          </button>
          
          <button className="navbar-btn-icone" onClick={() => onNavigate('gameficacao')} title="Gameficação">
            <i className="fas fa-trophy"></i>
          </button>

          <button className="navbar-btn-icone" onClick={() => onNavigate('planos')} title="Planos">
            <i className="fas fa-gem"></i>
          </button>

          <button className="navbar-btn-login" onClick={() => onNavigate('login')}>
            <i className="fas fa-user"></i>
            <span>Login/Perfil</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;