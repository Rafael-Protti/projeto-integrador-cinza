import { useEffect, useState } from "react";
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
  const [categorias, setCategorias] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    descricao: "",
    id_categoria: "",
    imagem: "",
    quantidade: "1",
  });
  const [salvandoProduto, setSalvandoProduto] = useState(false);
  const [feedbackProduto, setFeedbackProduto] = useState({ message: "", isError: false });
  const [trocas, setTrocas] = useState(0);
  const [itensTrocados, setItensTrocados] = useState([]);
  const [carregandoTrocados, setCarregandoTrocados] = useState(() =>
    Boolean(
      supabase &&
        (localStorage.getItem("usuarioId") || sessionStorage.getItem("usuarioId"))
    )
  );
  const [fotoUrl, setFotoUrl] = useState("");
  const [salvando, setSalvando] = useState(false);

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
    const carregarCategorias = async () => {
      const { data, error } = await supabase
        .from("categorias")
        .select("id, nome")
        .order("nome");

      if (!componenteAtivo) return;
      if (error) {
        setFeedbackProduto({
          message: `Não foi possível carregar as categorias: ${error.message}`,
          isError: true,
        });
        return;
      }

      setCategorias(data ?? []);
    };

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
      setFotoUrl(data.foto || "");
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
    carregarCategorias();

    return () => {
      componenteAtivo = false;
      supabase.removeChannel(canalTrocas);
    };
  }, []);

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
    setIsFormModified(true);
  };

  const handleProdutoChange = (event) => {
    const { name, value } = event.target;
    setNovoProduto((atual) => ({ ...atual, [name]: value }));
  };

  const handleCadastrarProduto = async (event) => {
    event.preventDefault();

    const usuarioId = localStorage.getItem("usuarioId") || sessionStorage.getItem("usuarioId");
    if (!supabase || !usuarioId) {
      setFeedbackProduto({ message: "Entre na sua conta para cadastrar um item.", isError: true });
      return;
    }

    setSalvandoProduto(true);
    setFeedbackProduto({ message: "", isError: false });
    const { error } = await supabase.from("produtos").insert({
      id_usuario: usuarioId,
      nome: novoProduto.nome.trim(),
      descricao: novoProduto.descricao.trim(),
      quantidade: Number(novoProduto.quantidade),
      id_categoria: Number(novoProduto.id_categoria),
      imagem: novoProduto.imagem.trim() || null,
      xp: 0,
      ativo: true,
    });

    setSalvandoProduto(false);
    if (error) {
      setFeedbackProduto({
        message: `Não foi possível cadastrar o item: ${error.message}`,
        isError: true,
      });
      return;
    }

    setNovoProduto({ nome: "", descricao: "", id_categoria: "", imagem: "", quantidade: "1" });
    setFeedbackProduto({ message: "Item cadastrado com sucesso.", isError: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const usuarioId = localStorage.getItem("usuarioId") || sessionStorage.getItem("usuarioId");
    if (!supabase || !usuarioId) {
      setFeedback({
        show: true,
        message: "Não foi possível salvar: usuário ou Supabase não encontrado.",
        isError: true,
      });
      return;
    }

    setSalvando(true);
    const { error } = await supabase
      .from("usuarios")
      .update({
        nome: nome.trim(),
        telefone: telefone.trim(),
        email: email.trim(),
        foto: fotoUrl.trim() || null,
      })
      .eq("id", usuarioId);

    setSalvando(false);
    if (error) {
      setFeedback({
        show: true,
        message: `Não foi possível salvar as alterações: ${error.message}`,
        isError: true,
      });
      return;
    }

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
      <main id="pagina-perfil" className="conteudo-principal">
        {/* PERFIL */}
        <section className="painel-perfil">
          <div className="perfil-esquerdo">
            <div className="moldura-foto">
              <img
                src={fotoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                alt="Foto do usuário"
                className="foto-usuario"
              />

              <span className="legenda-foto">Foto</span>
            </div>

            <div className="foto-url-grupo">
              <label htmlFor="input-foto-url" className="campo-rotulo">Link da foto</label>
              <input
                type="url"
                id="input-foto-url"
                form="form-perfil"
                className="campo-input"
                value={fotoUrl}
                onChange={handleInputChange(setFotoUrl)}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="perfil-direito">
            <div className="perfil-cabecalho">
              <h2 className="titulo-painel">Informações Cadastrais</h2>
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

            <form id="form-perfil" className="form-perfil" onSubmit={handleSubmit}>
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
                  <button type="button" className="btn-encerrar-sessao" onClick={handleLogout}>
                    Encerrar sessão
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
                  disabled={!isFormModified || salvando}
                >
                  <i className="fas fa-save"></i>
                  {salvando ? "Salvando..." : "Salvar alterações"}
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="secao-novos-itens">
          <header className="header-novos-itens">
            <h2>Seus Itens</h2>
          </header>

          {feedbackProduto.message && (
            <p className={`feedback-produto ${feedbackProduto.isError ? "erro" : "sucesso"}`} role="status">
              {feedbackProduto.message}
            </p>
          )}

          <form className="form-novo-produto" onSubmit={handleCadastrarProduto}>
            <div className="campo-grupo">
              <label htmlFor="produto-nome" className="campo-rotulo">Nome do item</label>
              <input
                id="produto-nome"
                name="nome"
                className="campo-input"
                value={novoProduto.nome}
                onChange={handleProdutoChange}
                maxLength={120}
                required
              />
            </div>

            <div className="campo-grupo">
              <label htmlFor="produto-descricao" className="campo-rotulo">Descrição</label>
              <textarea
                id="produto-descricao"
                name="descricao"
                className="campo-input campo-descricao-produto"
                value={novoProduto.descricao}
                onChange={handleProdutoChange}
                rows="3"
                required
              />
            </div>

            <div className="campo-grupo">
              <label htmlFor="produto-categoria" className="campo-rotulo">Categoria</label>
              <select
                id="produto-categoria"
                name="id_categoria"
                className="campo-input"
                value={novoProduto.id_categoria}
                onChange={handleProdutoChange}
                required
              >
                <option value="" disabled>Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                ))}
              </select>
              {categorias.length === 0 && (
                <span className="ajuda-produto">Nenhuma categoria disponível para seleção.</span>
              )}
            </div>

            <div className="campo-grupo">
              <label htmlFor="produto-quantidade" className="campo-rotulo">Quantidade</label>
              <input
                id="produto-quantidade"
                name="quantidade"
                type="number"
                className="campo-input"
                value={novoProduto.quantidade}
                onChange={handleProdutoChange}
                min="1"
                step="1"
                required
              />
            </div>

            <div className="campo-grupo campo-imagem-produto">
              <label htmlFor="produto-imagem" className="campo-rotulo">Link da foto (opcional)</label>
              <input
                id="produto-imagem"
                name="imagem"
                type="url"
                className="campo-input"
                value={novoProduto.imagem}
                onChange={handleProdutoChange}
                placeholder="https://..."
              />
              {novoProduto.imagem && (
                <img className="preview-imagem-produto" src={novoProduto.imagem} alt="Pré-visualização do item" />
              )}
            </div>

            <button type="submit" className="btn-cadastrar-produto" disabled={salvandoProduto || categorias.length === 0}>
              {salvandoProduto ? "Cadastrando..." : "Cadastrar item"}
            </button>
          </form>
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

      <Rodape onNavigate={handleNavigate} /> 
      </div>

    );
  }

export default Perfil;
