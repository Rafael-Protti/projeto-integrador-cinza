import React, { useRef, useState } from "react";
import "./Cadastro.css";

function Cadastro() {
  const [nome, setNome] = useState("Ingrid Silva");
  const [telefone, setTelefone] = useState("(11) 98765-4321");
  const [email, setEmail] = useState("ingrid.silva@email.com");
  const [trocas, setTrocas] = useState(12);

  const [foto, setFoto] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  );

  const [fotoSelecionada, setFotoSelecionada] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [pesquisa, setPesquisa] = useState("");

  const inputFotoRef = useRef(null);

  const colecoes = [
    {
      nome: "Discos de Vinil",
      quantidade: 12,
      categoria: "vinil",
      imagem:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80",
    },
    {
      nome: "Livros",
      quantidade: 20,
      categoria: "livros",
      imagem:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    },
    {
      nome: "Cartinhas",
      quantidade: 36,
      categoria: "cartinhas",
      imagem:
        "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?auto=format&fit=crop&w=600&q=80",
    },
    {
      nome: "Jogo",
      quantidade: 9,
      categoria: "jogos",
      imagem:
        "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const handleTrocarFoto = () => {
    inputFotoRef.current?.click();
  };

  const handleSelecionarFoto = (event) => {
    const arquivo = event.target.files?.[0];

    if (!arquivo) return;

    if (!["image/jpeg", "image/png"].includes(arquivo.type)) {
      setMensagem("Selecione uma imagem JPG ou PNG.");
      return;
    }

    if (arquivo.size > 2 * 1024 * 1024) {
      setMensagem("A imagem deve ter no máximo 2MB.");
      return;
    }

    const url = URL.createObjectURL(arquivo);

    setFotoSelecionada(url);
    setModalAberto(true);
    setMensagem("");
  };

  const handleCancelarCorte = () => {
    if (fotoSelecionada) {
      URL.revokeObjectURL(fotoSelecionada);
    }

    setFotoSelecionada(null);
    setModalAberto(false);

    if (inputFotoRef.current) {
      inputFotoRef.current.value = "";
    }
  };

  const handleConfirmarCorte = () => {
    if (!fotoSelecionada) return;

    setFoto(fotoSelecionada);
    setFotoSelecionada(null);
    setModalAberto(false);
    setMensagem("Foto de perfil atualizada com sucesso!");

    if (inputFotoRef.current) {
      inputFotoRef.current.value = "";
    }
  };

  const handleIncrementarTroca = () => {
    setTrocas((valorAtual) => valorAtual + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setMensagem("Alterações salvas com sucesso!");

    setTimeout(() => {
      setMensagem("");
    }, 3000);
  };

  const handlePesquisar = () => {
    if (!pesquisa.trim()) return;

    console.log("Pesquisando por:", pesquisa);
  };

  return (
    <div className="pagina-cadastro">

      {/* HEADER */}
      <header className="topbar">
        <div className="topbar-container">

          <a href="/" className="logo">
            Galeria Atemporal
          </a>

          <div className="caixa-pesquisa">
            <input
              type="text"
              id="input-pesquisa"
              className="input-pesquisa"
              placeholder="Digite para pesquisar produtos ou perfil..."
              aria-label="Barra de pesquisa"
              value={pesquisa}
              onChange={(event) => setPesquisa(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handlePesquisar();
                }
              }}
            />

            <button
              type="button"
              className="btn-lupa"
              aria-label="Pesquisar"
              onClick={handlePesquisar}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>

          <div className="acoes-usuario">

            <button
              type="button"
              className="btn-icon"
              title="Notificações"
              aria-label="Notificações"
            >
              <i className="fas fa-bell"></i>
            </button>

            <button
              type="button"
              className="btn-icon"
              title="Mensagens"
              aria-label="Mensagens"
            >
              <i className="fas fa-envelope"></i>
            </button>

            <a href="/cadastro" className="btn-login">
              <i className="fas fa-user"></i>
              <span>Login/Cadastro</span>
            </a>

          </div>
        </div>
      </header>

      {/* SUBNAV */}
      <nav className="subnav" aria-label="Navegação secundária">
        <div className="subnav-container">
          <div className="botoes-topo">

            <a href="/" className="btn-retangulo active">
              Início
            </a>

            <a href="#mensagens" className="btn-retangulo">
              Mensagens
            </a>

            <a href="#configuracoes" className="btn-retangulo">
              Configurações
            </a>

          </div>
        </div>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="conteudo-principal">

        {/* PERFIL */}
        <section className="painel-perfil">

          {/* FOTO */}
          <div className="perfil-esquerdo">

            <div className="moldura-foto">
              <img
                id="img-usuario-preview"
                src={foto}
                alt="Foto do Usuário"
                className="foto-usuario"
              />

              <span className="legenda-foto">
                Foto
              </span>
            </div>

            <button
              type="button"
              id="btn-trocar-foto"
              className="btn-trocar-foto"
              onClick={handleTrocarFoto}
            >
              <i className="fas fa-camera"></i>
              Trocar foto
            </button>

            <input
              ref={inputFotoRef}
              type="file"
              id="input-foto-file"
              accept="image/jpeg, image/jpg, image/png"
              style={{ display: "none" }}
              onChange={handleSelecionarFoto}
            />

          </div>

          {/* FORMULÁRIO */}
          <div className="perfil-direito">

            <h2 className="titulo-painel">
              Informações Cadastrais
            </h2>

            {mensagem && (
              <div className="msg-feedback">
                {mensagem}
              </div>
            )}

            <form
              id="form-perfil"
              className="form-perfil"
              onSubmit={handleSubmit}
            >

              {/* NOME */}
              <div className="campo-grupo">

                <label
                  htmlFor="input-nome"
                  className="campo-rotulo"
                >
                  <i className="fas fa-user icone-pb"></i>
                  Nome Completo
                </label>

                <input
                  type="text"
                  id="input-nome"
                  className="campo-input"
                  value={nome}
                  placeholder="Ex: Maria Silva"
                  required
                  onChange={(event) => setNome(event.target.value)}
                />

              </div>

              {/* TELEFONE */}
              <div className="campo-grupo">

                <label
                  htmlFor="input-telefone"
                  className="campo-rotulo"
                >
                  <i className="fas fa-phone icone-pb"></i>
                  Telefone
                </label>

                <input
                  type="text"
                  id="input-telefone"
                  className="campo-input"
                  value={telefone}
                  placeholder="(11) 99999-9999"
                  required
                  onChange={(event) => setTelefone(event.target.value)}
                />

              </div>

              {/* EMAIL */}
              <div className="campo-grupo">

                <label
                  htmlFor="input-email"
                  className="campo-rotulo"
                >
                  <i className="fas fa-envelope icone-pb"></i>
                  E-mail
                </label>

                <input
                  type="email"
                  id="input-email"
                  className="campo-input"
                  value={email}
                  placeholder="seuemail@dominio.com"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />

              </div>

              {/* TROCAS */}
              <div className="campo-grupo">

                <label
                  htmlFor="input-trocas"
                  className="campo-rotulo"
                >
                  <i className="fas fa-exchange-alt icone-pb"></i>
                  Número de Trocas
                </label>

                <div className="caixa-trocas">

                  <div className="badge-trocas">
                    <span id="span-trocas-contador">
                      {trocas}
                    </span>{" "}
                    trocas realizadas
                  </div>

                  <button
                    type="button"
                    id="btn-incrementar-troca"
                    className="btn-add-ponto"
                    title="Adicionar +1 ponto de troca"
                    onClick={handleIncrementarTroca}
                  >
                    <i className="fas fa-plus"></i>
                    +1 Transação
                  </button>

                </div>

                <input
                  type="hidden"
                  id="input-trocas"
                  value={trocas}
                  readOnly
                />

              </div>

              {/* SALVAR */}
              <div className="caixa-acoes-form">

                <button
                  type="submit"
                  id="btn-salvar-alteracoes"
                  className="btn-salvar"
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

              <h2>
                Coleções
              </h2>

            </div>

          </header>

          <div
            id="grid-colecoes"
            className="grid-colecoes"
          >

            {colecoes.map((colecao) => (

              <article
                className="card-colecao"
                key={colecao.categoria}
              >

                <div className="imagem-colecao-box">

                  <img
                    src={colecao.imagem}
                    alt={colecao.nome}
                    className="img-colecao"
                  />

                </div>

                <div className="info-card-colecao">

                  <h3 className="nome-colecao">
                    {colecao.nome}
                  </h3>

                  <p className="qtd-itens">
                    {colecao.quantidade} itens disponíveis
                  </p>

                  <button
                    type="button"
                    className="btn-ver-colecao"
                    onClick={() =>
                      console.log(
                        "Abrindo coleção:",
                        colecao.categoria
                      )
                    }
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
      {modalAberto && (
        <div
          id="modal-corte"
          className="modal-overlay"
        >

          <div className="modal-conteudo">

            <h3>
              Ajustar Foto de Perfil
            </h3>

            <p className="subtitulo-modal">
              Centralize ou confirme o corte circular da
              imagem (Máx. 2MB)
            </p>

            <div className="cropper-container">

              <div className="cropper-mask-circular">

                <img
                  id="img-modal-preview"
                  src={fotoSelecionada}
                  alt="Pré-visualização da Foto"
                />

              </div>

            </div>

            <div className="modal-botoes">

              <button
                type="button"
                id="btn-cancelar-corte"
                className="btn-modal-secundario"
                onClick={handleCancelarCorte}
              >
                Cancelar
              </button>

              <button
                type="button"
                id="btn-confirmar-corte"
                className="btn-modal-primario"
                onClick={handleConfirmarCorte}
              >
                Aplicar Foto
              </button>

            </div>

          </div>

        </div>
      )}

      {/* FOOTER */}
      <footer className="rodape">

        <div className="rodape-container">

          <p className="copyright">
            @2025nomedosite.Todos os direitos reservados.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Cadastro;
