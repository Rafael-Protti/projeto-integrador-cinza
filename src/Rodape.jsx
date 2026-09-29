import React from 'react';
import './Rodape.css';

function Rodape({ onNavigate }) {
  return (
    <footer className="rodape">
      <div className="rodape-container">
        <div className="rodape-info">
          <span className="rodape-logo">XP Shop</span>
          <p className="rodape-descricao">
            A melhor plataforma para colecionadores trocarem e expandirem suas coleções.
          </p>
        </div>

        <div className="rodape-links">
          <button onClick={() => onNavigate('perfil')}>Início</button>
          <button onClick={() => onNavigate('planos')}>Planos</button>
          <button onClick={() => onNavigate('gameficacao')}>Gameficação</button>
          <button onClick={() => onNavigate('perfil')}>Perfil</button>
        </div>

        <div className="rodape-copyright">
          <span>&copy; {new Date().getFullYear()} XP Shop - Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}

export default Rodape;