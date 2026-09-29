import React, { useEffect, useRef,useState } from "react";
import "./Login.css";

function Login() {
  /*
   * ==========================================
   * ESTADOS DO USUÁRIO
   * ==========================================
   */

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [trocas, setTrocas] = useState(0);

  /*
   * Foto padrão enquanto o usuário não possui foto
   */

  const [fotoUrl, setFotoUrl] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  );

  /*
   * Coleções
   */

  const [colecoes, setColecoes] = useState([]);

  /*
   * Controle do formulário
   */

  const [isFormModified, setIsFormModified] =
    useState(false);

  /*
   * Mensagens
   */

  const [feedback, setFeedback] = useState({
    show: false,
    message: "",
    isError: false,
  });

  /*
   * Modal da foto
   */

  const [modalOpen, setModalOpen] =
    useState(false);

  const [tempFotoUrl, setTempFotoUrl] =
    useState("");

  /*
   * Arquivo real selecionado
   */

  const [arquivoSelecionado, setArquivoSelecionado] =
    useState(null);

  /*
   * Controle de upload
   */

  const [uploadingFoto, setUploadingFoto] =
    useState(false);

  /*
   * Referência para o input de arquivo
   */

  const fileInputRef = useRef(null);

  /*
   * ==========================================
   * ID DO USUÁRIO
   * ==========================================
   *
   * Na sua tabela usuarios existe o usuário:
   *
   * id = 1
   *
   * Por isso estamos utilizando 1 neste momento.
   *
   * Posteriormente podemos substituir pelo
   * usuário autenticado do Supabase Auth.
   */

  const usuarioId = 1;

  /*
   * ==========================================
   * CARREGAMENTO INICIAL
   * ==========================================
   */

  useEffect(() => {
    carregarUsuario();
    carregarColecoes();
  }, []);

  /*
   * ==========================================
   * MOSTRAR FEEDBACK
   * ==========================================
   */

  const mostrarFeedback = (
    message,
    isError = false
  ) => {
    setFeedback({
      show: true,
      message,
      isError,
    });

    setTimeout(() => {
      setFeedback({
        show: false,
        message: "",
        isError: false,
      });
    }, 4000);
  };

  /*
   * ==========================================
   * CARREGAR USUÁRIO
   * ==========================================
   */

  const carregarUsuario = async () => {
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select(
          "id, nome, telefone, email, foto, trocas, nascimento"
        )
        .eq("id", usuarioId)
        .single();

      if (error) {
        console.error(
          "Erro ao buscar usuário:",
          error
        );

        throw error;
      }

      if (!data) {
        throw new Error(
          "Usuário não encontrado."
        );
      }

      /*
       * Preenche os campos
       */

      setNome(data.nome || "");

      setTelefone(data.telefone || "");

      setEmail(data.email || "");

      setTrocas(data.trocas ?? 0);

      /*
       * Foto
       */

      if (data.foto) {
        setFotoUrl(data.foto);
      }
    } catch (error) {
      console.error(error);

      mostrarFeedback(
        "Não foi possível carregar os dados do usuário.",
        true
      );
    }
  };

  /*
   * ==========================================
   * CARREGAR COLEÇÕES
   * ==========================================
   */

  const carregarColecoes = async () => {
    try {
      const { data, error } = await supabase
        .from("colecoes")
        .select("*");

      if (error) {
        console.error(
          "Erro ao buscar coleções:",
          error
        );

        throw error;
      }

      /*
       * Transformamos os dados do Supabase
       * para o formato utilizado pelo React.
       */

      const colecoesFormatadas =
        (data || []).map((item) => ({
          id: item.id,

          nome:
            item.nome ||
            item.titulo ||
            item.categoria ||
            "Coleção",

          quantidade:
            item.quantidade ??
            item.qtd ??
            item.quantidade_itens ??
            0,

          imagem:
            item.imagem ||
            item.img ||
            item.foto ||
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
        }));

      setColecoes(colecoesFormatadas);
    } catch (error) {
      console.error(error);

      /*
       * Caso a tabela ainda não tenha registros,
       * deixamos a lista vazia.
       */

      setColecoes([]);
    }
  };

  /*
   * ==========================================
   * ALTERAÇÃO DOS INPUTS
   * ==========================================
   */

  const handleInputChange =
    (setter) => (e) => {
      setter(e.target.value);

      setIsFormModified(true);
    };

  /*
   * ==========================================
   * ADICIONAR TROCA
   * ==========================================
   */

  const handleIncrementarTroca = () => {
    setTrocas((prev) => prev + 1);

    setIsFormModified(true);
  };

  /*
   * ==========================================
   * SELECIONAR FOTO
   * ==========================================
   */

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    /*
     * Tamanho máximo: 2 MB
     */

    if (file.size > 2 * 1024 * 1024) {
      mostrarFeedback(
        "A imagem deve ter no máximo 5MB.",
        true
      );

      e.target.value = "";

      return;
    }

    /*
     * Formatos permitidos 
     */

    const tiposPermitidos = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!tiposPermitidos.includes(file.type)) {
      mostrarFeedback(
        "Selecione uma imagem JPG, PNG ou WEBP.",
        true
      );

      e.target.value = "";

      return;
    }

    /*
     * Cria uma URL temporária para mostrar
     * a imagem no modal.
     */

    const objectUrl =
      URL.createObjectURL(file);

    setTempFotoUrl(objectUrl);

    /*
     * Guarda o arquivo verdadeiro para
     * posteriormente enviar ao Supabase.
     */

    setArquivoSelecionado(file);

    /*
     * Abre o modal
     */

    setModalOpen(true);

    /*
     * Limpa mensagem anterior
     */

    setFeedback({
      show: false,
      message: "",
      isError: false,
    });
  };

  /*
   * ==========================================
   * CANCELAR FOTO
   * ==========================================
   */

  const handleCancelarFoto = () => {
    /*
     * Libera a URL temporária
     */

    if (tempFotoUrl) {
      URL.revokeObjectURL(tempFotoUrl);
    }

    setTempFotoUrl("");

    setArquivoSelecionado(null);

    setModalOpen(false);

    /*
     * Permite selecionar novamente a mesma foto
     */

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /*
   * ==========================================
   * CONFIRMAR FOTO
   * ==========================================
   */

  const handleConfirmarFoto = () => {
    if (!arquivoSelecionado) {
      return;
    }

    /*
     * Mostra imediatamente a imagem escolhida.
     *
     * O upload definitivo acontecerá quando
     * o usuário clicar em "Salvar alterações".
     */

    setFotoUrl(tempFotoUrl);

    setModalOpen(false);

    setIsFormModified(true);
  };

  /*
   * ==========================================
   * UPLOAD DA FOTO
   * ==========================================
   */

  const uploadFoto = async (arquivo) => {
    if (!arquivo) {
      return fotoUrl;
    }

    setUploadingFoto(true);

    try {
      /*
       * Descobre a extensão
       */

      const extensao =
        arquivo.name
          .split(".")
          .pop()
          ?.toLowerCase() || "jpg";

      /*
       * Nome único
       */

      const nomeArquivo =
        `usuario-${usuarioId}-${Date.now()}.${extensao}`;

      /*
       * Caminho dentro do Storage
       */

      const caminho =
        `perfis/${nomeArquivo}`;

      /*
       * Envia para o bucket avatars
       */

      const { error: uploadError } =
        await supabase.storage
          .from("avatars")
          .upload(
            caminho,
            arquivo,
            {
              cacheControl: "3600",
              upsert: false,
              contentType: arquivo.type,
            }
          );

      if (uploadError) {
        console.error(
          "Erro ao fazer upload:",
          uploadError
        );

        throw uploadError;
      }

      /*
       * Obtém URL pública
       */

      const { data } =
        supabase.storage
          .from("avatars")
          .getPublicUrl(caminho);

      if (!data?.publicUrl) {
        throw new Error(
          "Não foi possível obter a URL da imagem."
        );
      }

      return data.publicUrl;
    } finally {
      setUploadingFoto(false);
    }
  };

  /*
   * ==========================================
   * SALVAR ALTERAÇÕES
   * ==========================================
   */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let novaFotoUrl = fotoUrl;

      /*
       * Se o usuário selecionou uma nova foto,
       * envia primeiro para o Storage.
       */

      if (arquivoSelecionado) {
        novaFotoUrl =
          await uploadFoto(
            arquivoSelecionado
          );
      }

      /*
       * Atualiza a tabela usuarios
       */

      const { data, error } = await supabase
        .from("usuarios")
        .update({
          nome,
          telefone,
          email,
          trocas,
          foto: novaFotoUrl,
        })
        .eq("id", usuarioId)
        .select()
        .single();

      if (error) {
        console.error(
          "Erro ao atualizar usuário:",
          error
        );

        throw error;
      }

      console.log(
        "Usuário atualizado:",
        data
      );

      /*
       * Atualiza a foto para a URL permanente
       */

      setFotoUrl(novaFotoUrl);

      /*
       * Limpa arquivo selecionado
       */

      setArquivoSelecionado(null);

      setTempFotoUrl("");

      /*
       * Formulário não possui mais alterações
       */

      setIsFormModified(false);

      /*
       * Limpa input
       */

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      /*
       * Mensagem
       */

      mostrarFeedback(
        "Alterações salvas com sucesso!",
        false
      );
    } catch (error) {
      console.error(error);

      mostrarFeedback(
        "Não foi possível salvar as alterações.",
        true
      );
    }
  };

  /*
   * ==========================================
   * VER COLEÇÃO
   * ==========================================
   */

  const handleVerColecao = (categoria) => {
    console.log(
      "Abrindo coleção:",
      categoria
    );

    /*
     * Futuramente podemos utilizar React Router:
     *
     * navigate(`/colecao/${categoria}`);
     */
  };

  /*
   * ==========================================
   * HTML
   * ==========================================
   */

  return (
    <>
      

      

      {/* ======================================
          NAVEGAÇÃO
      ======================================= */}

      

      {/* ======================================
          CONTEÚDO
      ======================================= */}

      <main className="conteudo-principal">

        {/* ====================================
            PERFIL
        ===================================== */}

        <section className="painel-perfil">

          {/* LADO ESQUERDO */}

          <div className="perfil-esquerdo">

            <div className="moldura-foto">

              <img
                id="img-usuario-preview"
                src={fotoUrl}
                alt="Foto do usuário"
                className="foto-usuario"
              />

              <span className="legenda-foto">
                Foto
              </span>

            </div>

            <button
              type="button"
              className="btn-trocar-foto"
              onClick={() =>
                fileInputRef.current?.click()
              }
              disabled={uploadingFoto}
            >

              <i className="fas fa-camera"></i>

              <span>
                Trocar foto
              </span>

            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/jpeg,image/jpg,image/png,image/webp"
              style={{
                display: "none",
              }}
            />

          </div>

          {/* LADO DIREITO */}

          <div className="perfil-direito">

            <h2 className="titulo-painel">
              Informações Cadastrais
            </h2>

            {/* FEEDBACK */}

            {feedback.show && (

              <div
                className={`msg-feedback ${
                  feedback.isError
                    ? "erro"
                    : "sucesso"
                }`}
              >
                {feedback.message}
              </div>

            )}

            {/* FORMULÁRIO */}

            <form
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

                  <span>
                    Nome Completo
                  </span>

                </label>

                <input
                  type="text"
                  id="input-nome"
                  className="campo-input"
                  value={nome}
                  onChange={handleInputChange(
                    setNome
                  )}
                  placeholder="Ex: Maria Silva"
                  required
                />

              </div>

              {/* TELEFONE */}

              <div className="campo-grupo">

                <label
                  htmlFor="input-telefone"
                  className="campo-rotulo"
                >

                  <i className="fas fa-phone icone-pb"></i>

                  <span>
                    Telefone
                  </span>

                </label>

                <input
                  type="text"
                  id="input-telefone"
                  className="campo-input"
                  value={telefone}
                  onChange={handleInputChange(
                    setTelefone
                  )}
                  placeholder="(11) 99999-9999"
                  required
                />

              </div>

              {/* EMAIL */}

              <div className="campo-grupo">

                <label
                  htmlFor="input-email"
                  className="campo-rotulo"
                >

                  <i className="fas fa-envelope icone-pb"></i>

                  <span>
                    E-mail
                  </span>

                </label>

                <input
                  type="email"
                  id="input-email"
                  className="campo-input"
                  value={email}
                  onChange={handleInputChange(
                    setEmail
                  )}
                  placeholder="seuemail@dominio.com"
                  required
                />

              </div>

              {/* TROCAS */}

              <div className="campo-grupo">

                <label className="campo-rotulo">

                  <i className="fas fa-exchange-alt icone-pb"></i>

                  <span>
                    Número de Trocas
                  </span>

                </label>

                <div className="caixa-trocas">

                  <div className="badge-trocas">

                    <span>
                      {trocas}
                    </span>

                    <span>
                      trocas realizadas
                    </span>

                  </div>

                  <button
                    type="button"
                    className="btn-add-ponto"
                    title="Adicionar +1 ponto de troca"
                    onClick={
                      handleIncrementarTroca
                    }
                  >

                    <i className="fas fa-plus"></i>

                    <span>
                      +1 Transação
                    </span>

                  </button>

                </div>

              </div>

              {/* BOTÃO SALVAR */}

              <div className="caixa-acoes-form">

                {isFormModified && (

                  <button
                    type="submit"
                    className="btn-salvar"
                    disabled={uploadingFoto}
                  >

                    <i className="fas fa-save"></i>

                    <span>
                      {uploadingFoto
                        ? "Enviando foto..."
                        : "Salvar alterações"}
                    </span>

                  </button>

                )}

              </div>

            </form>

          </div>

        </section>

        {/* ====================================
            COLEÇÕES
        ===================================== */}

        <section className="secao-colecoes">

          <header className="header-colecoes">

            <div className="titulo-estrela-wrapper">

              <i className="fas fa-star icone-estrela-pb"></i>

              <h2>
                Coleções
              </h2>

            </div>

          </header>

          <div className="grid-colecoes">

            {colecoes.length === 0 ? (

              <p>
                Nenhuma coleção encontrada.
              </p>

            ) : (

              colecoes.map((item) => (

                <article
                  key={item.id}
                  className="card-colecao"
                >

                  <div className="imagem-colecao-box">

                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="img-colecao"
                    />

                  </div>

                  <div className="info-card-colecao">

                    <h3 className="nome-colecao">
                      {item.nome}
                    </h3>

                    <p className="qtd-itens">
                      {item.quantidade}{" "}
                      itens disponíveis
                    </p>

                    <button
                      type="button"
                      className="btn-ver-colecao"
                      onClick={() =>
                        handleVerColecao(
                          item.id
                        )
                      }
                    >
                      Ver coleção
                    </button>

                  </div>

                </article>

              ))

            )}

          </div>

        </section>

      </main>

      {/* ======================================
          MODAL FOTO
      ======================================= */}

      {modalOpen && (

        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
        >

          <div className="modal-conteudo">

            <h3>
              Ajustar Foto de Perfil
            </h3>

            <p className="subtitulo-modal">
              Centralize ou confirme o corte
              circular da imagem (Máx. 2MB)
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
                onClick={
                  handleCancelarFoto
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="btn-modal-primario"
                onClick={
                  handleConfirmarFoto
                }
              >
                Aplicar Foto
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ======================================
          FOOTER
      ======================================= */}

      <footer className="footer-principal">

        <div className="footer-container">

          <p>
            
          </p>

        </div>

      </footer>
    </>
  );
}

export default Login;
