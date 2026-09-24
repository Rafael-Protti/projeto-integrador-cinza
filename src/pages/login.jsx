import React, { useState } from 'react';
import './React_login.css'; 

   function login() {
  
  const [cadastroEmail, setCadastroEmail] = useState('');
  const [cadastroSenha, setCadastroSenha] = useState('');

 
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');

  
  const [mostrarSenha, setMostrarSenha] = useState(false);

  
  const handleCadastroSubmit = (e) => {
    e.preventDefault();
    
    console.log('Cadastro:', { email: cadastroEmail, senha: cadastroSenha });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
   
    console.log('Login:', { email: loginEmail, senha: loginSenha });
  };

  return (
    <>
      
      <header>
        <div>
          
          <a>
            <i></i>
            <span></span>
          </a>

        
          <div>
            <a>
              <i></i>
            </a>
            <a>
              <i></i>
            </a>
            <a>
              <i></i>
            </a>
          </div>
        </div>
      </header>

      
      <main className="conteudo-principal">
        <section className="painel-autenticacao">
          
          
          <div className="coluna-cadastro">
            <header className="header-cadastro">
              <div className="avatar-contato-box">
                <i className="fas fa-user-plus"></i>
              </div>
              <h2 className="titulo-criar-conta">Quero criar uma conta</h2>
            </header>

       
            <form className="form-autenticacao" onSubmit={handleCadastroSubmit}>
        
              <div className="campo-grupo">
                <label htmlFor="cadastro-email" className="campo-rotulo">
                  <i className="fas fa-envelope"></i> Email
                </label>
                <div className="input-wrapper">
                  <i className="fas fa-envelope input-icon-prefix"></i>
                  <input
                    type="email"
                    id="cadastro-email"
                    name="email"
                    className="campo-input-retangulo"
                    placeholder="Digite seu e-mail"
                    autoComplete="email"
                    value={cadastroEmail}
                    onChange={(e) => setCadastroEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              
              <div className="campo-grupo">
                <label htmlFor="cadastro-senha" className="campo-rotulo">
                  <i className="fas fa-lock"></i> Senha
                </label>
                <div className="input-wrapper">
                  <i className="fas fa-lock input-icon-prefix"></i>
                  <input
                    type="password"
                    id="cadastro-senha"
                    name="senha"
                    className="campo-input-retangulo"
                    placeholder="Digite sua senha"
                    autoComplete="new-password"
                    minLength={8}
                    value={cadastroSenha}
                    onChange={(e) => setCadastroSenha(e.target.value)}
                    required
                  />
                </div>
                <p className="texto-ajuda-senha">
                  <i className="fas fa-info-circle"></i> A senha deve conter pelo menos 8 caracteres, incluindo letras e números.
                </p>
              </div>

           
              <div className="espacamento-botao-2cm">
                <button type="submit" className="btn-continuar">
                  <span>Continuar</span>
                  <i className="fas fa-chevron-right setinha"></i>
                </button>
              </div>

             
              <div className="divisor-social">Ou crie sua conta com</div>
              <div className="botoes-social">
                <button type="button" className="btn-social" title="Criar com Google">
                  <i className="fab fa-google"></i> Google
                </button>
                <button type="button" className="btn-social" title="Criar com Apple">
                  <i className="fab fa-apple"></i> Apple
                </button>
                <button type="button" className="btn-social" title="Criar com Facebook">
                  <i className="fab fa-facebook-f"></i> Facebook
                </button>
              </div>
            </form>
          </div>

          
          <div className="divisor-central-ou">
            <div className="linha-vertical"></div>
            <div className="circulo-ou">Ou</div>
          </div>

         
          <div className="coluna-login">
            <header className="header-login">
              <div className="cadeado-topo-box">
                <i className="fas fa-lock"></i>
              </div>
              <h2 className="titulo-ja-tenho-conta">Já tenho conta</h2>
            </header>

           
            <form className="form-autenticacao" onSubmit={handleLoginSubmit}>
             
              <div className="campo-grupo">
                <label htmlFor="login-email" className="campo-rotulo">
                  <i className="fas fa-envelope"></i> Email
                </label>
                <div className="input-wrapper">
                  <i className="fas fa-envelope input-icon-prefix"></i>
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    className="campo-input-retangulo"
                    placeholder="Digite seu email"
                    autoComplete="username"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

             
              <div className="campo-grupo">
                <label htmlFor="login-senha" className="campo-rotulo">
                  <i className="fas fa-lock"></i> Senha
                </label>
                <div className="input-wrapper">
                  <i className="fas fa-lock input-icon-prefix"></i>
                  <input
                    type={mostrarSenha ? 'text' : 'password'}
                    id="login-senha"
                    name="senha"
                    className="campo-input-retangulo"
                    placeholder="digite sua senha"
                    autoComplete="current-password"
                    value={loginSenha}
                    onChange={(e) => setLoginSenha(e.target.value)}
                    required
                  />
                  
                 
                  <button
                    type="button"
                    className="btn-olho-toggle"
                    title={mostrarSenha ? 'Ocultar senha' : 'Exibir senha'}
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <i className={`fas ${mostrarSenha ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              
              <div className="caixa-acoes-login">
                <button type="submit" className="btn-continuar">
                  <span>Continuar</span>
                  <i className="fas fa-chevron-right setinha"></i>
                </button>
              </div>

              
              <button type="button" className="btn-entrar-sem-senha">
                <i className="fas fa-envelope"></i>
                <span>entrar sem senha</span>
              </button>

              
              <div className="caixa-esqueci-senha">
                <a href="#esqueci-senha" className="link-esqueci-senha">
                  esqueci a senha
                </a>
              </div>

             
              <div className="dica-seguranca">
                <i className="fas fa-shield-halved"></i>
                <span>Autenticação de dois fatores (2FA) e proteção contra acessos não autorizados ativada.</span>
              </div>
            </form>
          </div>

        </section>
      </main>

     
      <footer >
        <div >
        <p></p> 
        </div>
      </footer>
    </>
  );
}
 
export default login;