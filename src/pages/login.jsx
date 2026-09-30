import { useState } from 'react';
import './login.css';
import Navbar from '../navbar'
import Rodape from '../rodape'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

function Login() {

  const navigate = useNavigate();
  const handleNavigate = (path) => navigate(`/${path}`);
  const [cadastroNome, setCadastroNome] = useState('');
  const [cadastroEmail, setCadastroEmail] = useState('');
  const [cadastroSenha, setCadastroSenha] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [authError, setAuthError] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleCadastroSubmit = async (e) => {
    e.preventDefault();
    setAuthMessage('');
    setAuthError(false);

    if (!supabase) {
      setAuthMessage('Supabase não configurado. Confira as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.');
      setAuthError(true);
      return;
    }

    setCarregando(true);
    try {
      const email = cadastroEmail.trim().toLowerCase();
      const { data: usuarioExistente, error: erroBusca } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (erroBusca) throw erroBusca;
      if (usuarioExistente) {
        setAuthMessage('Já existe um cadastro com este e-mail.');
        setAuthError(true);
        return;
      }

      const { error } = await supabase.from('usuarios').insert({
        nome: cadastroNome.trim(),
        email,
        senha: cadastroSenha,
      });

      if (error) throw error;
      setAuthMessage('Cadastro realizado. Agora você já pode fazer login.');
    } catch (error) {
      setAuthMessage(error.message || 'Não foi possível realizar o cadastro.');
      setAuthError(true);
    } finally {
      setCarregando(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthMessage('');
    setAuthError(false);

    if (!supabase) {
      setAuthMessage('Supabase não configurado. Confira as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.');
      setAuthError(true);
      return;
    }

    setCarregando(true);
    try {
      const { data: usuario, error } = await supabase
        .from('usuarios')
        .select('id')
        .eq('email', loginEmail.trim().toLowerCase())
        .eq('senha', loginSenha)
        .maybeSingle();

      if (error) throw error;
      if (!usuario) {
        setAuthMessage('E-mail ou senha inválidos.');
        setAuthError(true);
        return;
      }

      sessionStorage.setItem('usuarioId', usuario.id);
      navigate('/perfil');
    } catch (error) {
      setAuthMessage(error.message || 'Não foi possível fazer login.');
      setAuthError(true);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div>
      <Navbar onNavigate={handleNavigate} />

      <main className="conteudo-principal">
        <section className="painel-autenticacao">
          {authMessage && (
            <p className={`mensagem-autenticacao ${authError ? 'erro' : 'sucesso'}`} role={authError ? 'alert' : 'status'}>
              {authMessage}
            </p>
          )}

          <div className="coluna-cadastro">
            <header className="header-cadastro">
              <div className="avatar-contato-box">
                <i className="fas fa-user-plus"></i>
              </div>
              <h2 className="titulo-criar-conta">Quero criar uma conta</h2>
            </header>


            <form className="form-autenticacao" onSubmit={handleCadastroSubmit}>

              <div className="campo-grupo">
                <label htmlFor="cadastro-nome" className="campo-rotulo">
                  <i className="fas fa-user"></i> Nome
                </label>
                <div className="input-wrapper">
                  <i className="fas fa-user input-icon-prefix"></i>
                  <input
                    type="text"
                    id="cadastro-nome"
                    name="nome"
                    className="campo-input-retangulo"
                    placeholder="Digite seu nome"
                    autoComplete="name"
                    value={cadastroNome}
                    onChange={(e) => setCadastroNome(e.target.value)}
                    required
                  />
                </div>
              </div>

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
                <button type="submit" className="btn-continuar" disabled={carregando}>
                  <span>{carregando ? 'Aguarde...' : 'Continuar'}</span>
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
                <button type="submit" className="btn-continuar" disabled={carregando}>
                  <span>{carregando ? 'Aguarde...' : 'Continuar'}</span>
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
      <Rodape onNavigate={handleNavigate} />
    </div>
  );
}

export default Login;