import { useEffect, useRef, useState } from "react";
import "./Perfil.css";
import Navbar from '../Navbar.jsx'
import Rodape from "../Rodape.jsx";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function Perfil() {

  const navigate = useNavigate();
  const handleNavigate = (path) => navigate(`/${path}`);
  const handleLogout = () => {
    localStorage.removeItem("usuarioId");
    sessionStorage.removeItem("usuarioId");
    navigate("/login");
  };


  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [trocas, setTrocas] = useState(0);
  const [itensTrocados, setItensTrocados] = useState([]);
  const [carregandoTrocados, setCarregandoTrocados] = useState(() =>
    Boolean(
      supabase &&
        (localStorage.getItem("usuarioId") || sessionStorage.getItem("usuarioId"))
    )
  );
  const [fotoUrl, setFotoUrl] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  );

  const [isFormModified, setIsFormModified] = useState(false);

  const [feedback, setFeedback] = useState({
    show: false,
    message: "",
    isError: false,
  });

  useEffect(() => {
    const usuarioId = localStorage.getItem("usuarioId") || sessionStorage.getItem("usuarioId");
    if (!supabase || !usuarioId) return;

    let componenteAtivo = true;
    const carregarTrocados = async () => {
      const { data, count, error } = await supabase
        .from("trocados")
        .select(
          "id, created_at, produtos!trocados_id_produto_fkey(id, nome, imagem, categorias(nome))",
          { count: "exact" }
        )
        .eq("id_usuario", usuarioId)
        .eq("status", true)
        .order("created_at", { ascending: false });

      if (!componenteAtivo) return;
      if (error) {
        setFeedback({
          show: true,
          message: `Não foi possível carregar seus trocados: ${error.message}`,
          isError: true,
        });
        setCarregandoTrocados(false);
        return;
      }

      setTrocas(count ?? 0);
      setItensTrocados((data ?? []).filter((item) => item.produtos));
      setCarregandoTrocados(false);
    };

    const carregarPerfil = async () => {
      const { data, error } = await supabase
        .from("usuarios")
        .select("nome, telefone, email, foto")
        .eq("id", usuarioId)
        .maybeSingle();

      if (!componenteAtivo) return;
      if (error || !data) {
        setFeedback({
          show: true,
          message: error?.message || "Não foi possível carregar os dados do usuário.",
          isError: true,
        });
        return;
      }

      setNome(data.nome || "");
      setTelefone(data.telefone || "");
      setEmail(data.email || "");
      if (data.foto) setFotoUrl(data.foto);
    };

    const canalTrocas = supabase
      .channel(`perfil-trocados-${usuarioId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "trocados",
          filter: `id_usuario=eq.${usuarioId}`,
        },
        carregarTrocados
      )
      .subscribe();

    carregarPerfil();
    carregarTrocados();

    return () => {
      componenteAtivo = false;
      supabase.removeChannel(canalTrocas);
    };
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [tempFotoUrl, setTempFotoUrl] = useState("");

  const fileInputRef = useRef(null);

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
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
      <div>
      <Navbar onNavigate={handleNavigate} />

      

     

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
            <div className="perfil-cabecalho">
              <h2 className="titulo-painel">Informações Cadastrais</h2>
              <button type="button" className="btn-encerrar-sessao" onClick={handleLogout}>
                Encerrar sessão
              </button>
            </div>

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
              <h2>Seus Trocados</h2>
            </div>
          </header>

          <div className="grid-colecoes">
            {carregandoTrocados ? (
              <p className="estado-trocados">Carregando seus itens trocados...</p>
            ) : itensTrocados.length === 0 ? (
              <p className="estado-trocados">Você ainda não tem itens trocados.</p>
            ) : itensTrocados.map((item) => (
              <article
                key={item.id}
                className="card-colecao"
              >
                <div className="imagem-colecao-box">
                  {item.produtos.imagem ? (
                    <img
                      src={item.produtos.imagem}
                      alt={item.produtos.nome}
                      className="img-colecao"
                    />
                  ) : (
                    <div className="imagem-trocado-sem-foto" aria-label="Item sem imagem">
                      <i className="fas fa-box-open" aria-hidden="true"></i>
                    </div>
                  )}
                </div>

                <div className="info-card-colecao">
                  <h3 className="nome-colecao">
                    {item.produtos.nome}
                  </h3>

                  <p className="qtd-itens">
                    {item.produtos.categorias?.nome || "Item trocado"}
                  </p>
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

      <Rodape onNavigate={handleNavigate} /> 
      </div>

    );
  }

export default Perfil;
