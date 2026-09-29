import { useRef, useState } from "react";
import "./login.css";

function Login() {
  const [nome, setNome] = useState("Maria Souza");
  const [telefone, setTelefone] = useState("(11) 98765-4321");
  const [email, setEmail] = useState("Maria.souza@email.com");
  const [trocas, setTrocas] = useState(12);

  const [fotoUrl, setFotoUrl] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  );

  const [isFormModified, setIsFormModified] = useState(false);

  const [feedback, setFeedback] = useState({
    show: false,
    message: "",
    isError: false,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [tempFotoUrl, setTempFotoUrl] = useState("");

  const fileInputRef = useRef(null);

  const colecoesData = [
    {
      id: "vinil",
      titulo: "Discos de Vinil",
      qtd: "12 itens disponíveis",
      img: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "livros",
      titulo: "Livros",
      qtd: "20 itens disponíveis",
      img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "cartinhas",
      titulo: "Cartinhas",
      qtd: "36 itens disponíveis",
      img: "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "jogos",
      titulo: "Jogos",
      qtd: "9 itens disponíveis",
      img: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    setIsFormModified(true);
  };

  const handleIncrementarTroca = () => {
    setTrocas((prev) => prev + 1);
    setIsFormModified(true);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setFeedback({
        show: true,
        message: "A imagem deve ter no máximo 2MB.",
        isError: true,
      });

      return;
    }

    const objectUrl = URL.createObjectURL(file);

    setTempFotoUrl(objectUrl);
    setModalOpen(true);
  };

  const handleConfirmarFoto = () => {
    if (!tempFotoUrl) return;

    setFotoUrl(tempFotoUrl);
    setModalOpen(false);
    setIsFormModified(true);
  };

  const handleCancelarFoto = () => {
    setModalOpen(false);

    if (tempFotoUrl) {
      URL.revokeObjectURL(tempFotoUrl);
      setTempFotoUrl("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsFormModified(false);

    setFeedback({
      show: true,
      message: "Alterações salvas com sucesso!",
      isError: false,
    });

    setTimeout(() => {
      setFeedback({
        show: false,
        message: "",
        isError: false,
      });
    }, 4000);
  };

  return (
    <>
      {/* HEADER */}
      <header>
        <div>
          <a href="#inicio" aria-label="Página inicial">
            Logo
          </a>

          <div>
            <input
              type="search"
              placeholder="Pesquisar..."
              aria-label="Pesquisar"
            />

            <button type="button" aria-label="Pesquisar">
              <i className="fas fa-search"></i>
            </button>
          </div>

          <div>
            <button type="button" aria-label="Notificações">
              <i className="fas fa-bell"></i>
            </button>

            <button type="button" aria-label="Mensagens">
              <i className="fas fa-envelope"></i>
            </button>

            <a href="#perfil">
              <i className="fas fa-user"></i>
              <span>Maria</span>
            </a>
          </div>
        </div>
      </header>

      {/* NAVEGAÇÃO */}
      <nav className="subnav" aria-label="Navegação secundária">
        <div className="subnav-container">
          <div className="botoes-topo">
            <a href="#inicio" className="btn-retangulo active">
              Início
            </a>

            <a href="/mensagens" className="btn-retangulo">
              Mensagens
            </a>

            <a href="/configuracoes" className="btn-retangulo">
              Configurações
            </a>
          </div>
        </div>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="conteudo-principal">
        {/* PERFIL */}
        <section className="painel-perfil">
          <div className="perfil-esquerdo">
            <div className="moldura-foto">
              <img
                src={fotoUrl}
                alt="Foto do usuário"
                className="foto-usuario"
              />

              <span className="legenda-foto">Foto</span>
            </div>

            <button
              type="button"
              className="btn-trocar-foto"
              onClick={() => fileInputRef.current?.click()}
            >
              <i className="fas fa-camera"></i>
              Trocar foto
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/jpeg,image/jpg,image/png"
              style={{ display: "none" }}
            />
          </div>

          <div className="perfil-direito">
            <h2 className="titulo-painel">
              Informações Cadastrais
            </h2>

            {feedback.show && (
              <div
                className={`msg-feedback ${
                  feedback.isError ? "erro" : "sucesso"
                }`}
              >
                {feedback.message}
              </div>
            )}

            <form className="form-perfil" onSubmit={handleSubmit}>
              {/* NOME */}
              <div className="campo-grupo">
                <label htmlFor="input-nome" className="campo-rotulo">
                  <i className="fas fa-user icone-pb"></i>
                  Nome Completo
                </label>

                <input
                  type="text"
                  id="input-nome"
                  className="campo-input"
                  value={nome}
                  onChange={handleInputChange(setNome)}
                  placeholder="Ex: Maria Silva"
                  required
                />
              </div>

              {/* TELEFONE */}
              <div className="campo-grupo">
                <label htmlFor="input-telefone" className="campo-rotulo">
                  <i className="fas fa-phone icone-pb"></i>
                  Telefone
                </label>

                <input
                  type="tel"
                  id="input-telefone"
                  className="campo-input"
                  value={telefone}
                  onChange={handleInputChange(setTelefone)}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="campo-grupo">
                <label htmlFor="input-email" className="campo-rotulo">
                  <i className="fas fa-envelope icone-pb"></i>
                  E-mail
                </label>

                <input
                  type="email"
                  id="input-email"
                  className="campo-input"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                  placeholder="seuemail@dominio.com"
                  required
                />
              </div>

              {/* TROCAS */}
              <div className="campo-grupo">
                <label className="campo-rotulo">
                  <i className="fas fa-exchange-alt icone-pb"></i>
                  Número de Trocas
                </label>

                <div className="caixa-trocas">
                  <div className="badge-trocas">
                    <span>{trocas}</span> trocas realizadas
                  </div>

                  <button
                    type="button"
                    className="btn-add-ponto"
                    title="Adicionar +1 ponto de troca"
                    onClick={handleIncrementarTroca}
                  >
                    <i className="fas fa-plus"></i>
                    +1 Transação
                  </button>
                </div>
              </div>

              {/* BOTÃO SALVAR */}
              <div className="caixa-acoes-form">
                <button
                  type="submit"
                  className={`btn-salvar ${
                    !isFormModified ? "oculto" : ""
                  }`}
                  disabled={!isFormModified}
                >
                  <i className="fas fa-save"></i>
                  Salvar alterações
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* COLEÇÕES */}
        <section className="secao-colecoes">
          <header className="header-colecoes">
            <div className="titulo-estrela-wrapper">
              <i className="fas fa-star icone-estrela-pb"></i>
              <h2>Coleções</h2>
            </div>
          </header>

          <div className="grid-colecoes">
            {colecoesData.map((item) => (
              <article
                key={item.id}
                className="card-colecao"
              >
                <div className="imagem-colecao-box">
                  <img
                    src={item.img}
                    alt={item.titulo}
                    className="img-colecao"
                  />
                </div>

                <div className="info-card-colecao">
                  <h3 className="nome-colecao">
                    {item.titulo}
                  </h3>

                  <p className="qtd-itens">
                    {item.qtd}
                  </p>

                  <button
                    type="button"
                    className="btn-ver-colecao"
                    data-categoria={item.id}
                  >
                    Ver coleção
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* MODAL DA FOTO */}
      {modalOpen && (
        <div className="modal-overlay">
          <div
            className="modal-conteudo"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-modal"
          >
            <h3 id="titulo-modal">
              Ajustar Foto de Perfil
            </h3>

            <p className="subtitulo-modal">
              Centralize ou confirme o corte circular da imagem
              (Máx. 2MB)
            </p>

            <div className="cropper-container">
              <div className="cropper-mask-circular">
                <img
                  src={tempFotoUrl}
                  alt="Pré-visualização da foto"
                />
              </div>
            </div>

            <div className="modal-botoes">
              <button
                type="button"
                className="btn-modal-secundario"
                onClick={handleCancelarFoto}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="btn-modal-primario"
                onClick={handleConfirmarFoto}
              >
                Aplicar Foto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer>
        <div>
          <p>© 2026 - Sistema de Trocas</p>
        </div>
      </footer>
    </>
  );
}

export default Login;
