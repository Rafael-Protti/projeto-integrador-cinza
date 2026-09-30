import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { supabase } from "../supabase.js";
import Navbar from '../Navbar.jsx'
import Rodape from '../Rodape.jsx'
import "./Gameficacao.css"

function Gameficacao() {

    const navigate = useNavigate();
    const handleNavigate = (path) => navigate(`/${path}`);

    const [rankingVisivel, alteraRankingVisivel] = useState(false);
    const [medalhasVisivel, alteraMedalhasVisivel] = useState(false);
    const [missoesVisivel, alteraMissoesVisivel] = useState(false);
    const [abaMissoes, alteraAbaMissoes] = useState("diarias");

    const [usuarioGameficacao, alteraUsuarioGameficacao] = useState([]) /*copiar*/
    const [rankingGameficacao, alteraRankingGameficacao] = useState([])
    const [carregando, alteraCarregando] = useState(true)
    const usuarioAtual = 1;
    const num = 0;

    const [nivelAtual, alteraNivelAtual] = useState(1.0)
    const [xpAtual, alteraXpAtual] = useState(0)
    const [xpProxNivel, alteraXpProxNivel] = useState(500.0)
    function alteraVisualizacaoRanking() {
        alteraRankingVisivel(!rankingVisivel)
    }

    function alteraVisualizacaoMedalhas() {
        alteraMedalhasVisivel(!medalhasVisivel)
    }

    function alteraVisualizacaoMissoes() {
        alteraMissoesVisivel(!missoesVisivel)
    }

    async function buscarUsuarioAutenticado() { /*copiar*/

        alteraCarregando(true)

        const { error, data } = await supabase.from('gamificacao').select("*, id_usuario(nome, foto)").eq("id_usuario", usuarioAtual).single()
        alteraUsuarioGameficacao(data)
        console.log(data)

        alteraCarregando(false)

        calcularNivel(data?.xp)
    }

    async function buscarUsuariosRanking(todosUsuarios = false) { // Se true, busca a lista inteira da tabela de Gamificação, se false, apenas o top5.

        const { error, data } = await supabase.from('gamificacao').select("*, id_usuario(nome, foto)").order("xp", { ascending: false }).limit(5)
        alteraRankingGameficacao(data)
        console.log(data)

    }

    useEffect(() => { /*copiar*/
        buscarUsuariosRanking()
        buscarUsuarioAutenticado()
    }, [])


    function calcularNivel(xpRecebido) {
        let novoXp = xpAtual + xpRecebido;
        novoXp = Math.floor(novoXp / 50) * 50
        let novoNivel = nivelAtual;
        let novoXpProxNivel = xpProxNivel;

        while (novoXp >= novoXpProxNivel) {
            novoXp -= novoXpProxNivel;
            novoNivel += 1;

            novoXpProxNivel = Math.floor(novoXpProxNivel * 1.1);
            novoXpProxNivel = Math.floor(novoXpProxNivel / 50) * 50
        }

        alteraXpAtual(novoXp);
        alteraNivelAtual(novoNivel);
        alteraXpProxNivel(novoXpProxNivel);
    };


    return (
        <div>
            <Navbar onNavigate={handleNavigate} />

            {carregando == false ? <main className="conteudo">

                {
                    rankingVisivel == true ?
                        <div className="janelaFlutuanteFundo">
                            <div className="janelaFlutuante">
                                <h2> <i className="fas fa-trophy icone-painel"></i> Ranking dos Colecionadores <i className="fa-solid fa-x icone-x" onClick={() => alteraVisualizacaoRanking()}></i></h2>
                                <p>Usuario 1 <strong>1000XP</strong></p>
                                <p>Usuario 1 <strong>1000XP</strong></p>
                                <p>Usuario 1 <strong>1000XP</strong></p>
                                <p>Usuario 1 <strong>1000XP</strong></p>
                                <p>Usuario 1 <strong>1000XP</strong></p>
                                <p>Usuario 1 <strong>1000XP</strong></p>
                                <p>Usuario 1 <strong>1000XP</strong></p>
                            </div>
                        </div>
                        : <></>
                }

                {
                    medalhasVisivel == true ?
                        <div className="janelaFlutuanteFundo">
                            <div className="janelaFlutuante">
                                <h2> <i className="fas fa-medal icone-painel"></i> Todas as Medalhas <i className="fa-solid fa-x icone-x" onClick={() => alteraVisualizacaoMedalhas()}></i></h2>
                                <p>Medalha 1</p>
                                <p>Medalha 1</p>
                                <p>Medalha 1</p>
                                <p>Medalha 1</p>
                                <p>Medalha 1</p>
                                <p>Medalha 1</p>
                            </div>
                        </div>
                        : <></>
                }

                {
                    missoesVisivel == true ?
                        <div className="janelaFlutuanteFundo">
                            <div className="janelaFlutuante">
                                <h2> <i className="fas fa-bullseye icone-missao"></i> Todas as Missões <i className="fa-solid fa-x icone-x" onClick={() => alteraVisualizacaoMissoes()}></i></h2>
                                <p>Missão 1</p>
                                <p>Missão 1</p>
                                <p>Missão 1</p>
                                <p>Missão 1</p>
                                <p>Missão 1</p>
                                <p>Missão 1</p>
                            </div>
                        </div>
                        : <></>
                }


                <header className="titulo-pagina">
                    <div className="titulo-wrapper">
                        <i className="fas fa-trophy icone-titulo"></i>
                        <h1>Gameficação</h1>
                    </div>
                    <p className="desc-titulo">Acompanhe seu progresso e conquiste recompensas!</p>
                </header>

                <section className="painel-perfil">
                    <div className="perfil-esquerdo">
                        <img src={usuarioGameficacao.id_usuario?.foto} alt="Foto do usuário" className="foto-usuario" />
                        <div className="info-usuario">
                            <h2 className="nome-usuario">{usuarioGameficacao.id_usuario?.nome}</h2>
                            <span className="nivel-texto">Nível {nivelAtual}</span>

                            <div className="xp-container">
                                <div className="barra-xp-fundo">
                                    <div className="barra-xp-progresso" style={{ width: (xpAtual * 100) / xpProxNivel + "%" }}></div>
                                </div>
                                <span className="xp-quantia"><span className="xp-atual">{xpAtual} XP</span><span className="xp-total">/{xpProxNivel}
                                    XP</span></span>
                            </div>

                            <p className="xp-faltante">Faltam {xpProxNivel - xpAtual} XP para o próximo nível</p>
                        </div>
                    </div>

                    <div className="painel-status">
                        <div className="status-card">
                            <i className="fas fa-star icone-status"></i>
                            <span className="status-valor">{xpAtual}</span>
                            <span className="status-texto">XP Total</span>
                        </div>
                        <div className="status-card">
                            <i className="fas fa-chart-line icone-status"></i>
                            <span className="status-valor">{nivelAtual}</span>
                            <span className="status-texto">Nível Atual</span>
                        </div>
                        <div className="status-card">
                            <i className="fas fa-bullseye icone-status"></i>
                            <span className="status-valor">Adicionar..</span>
                            <span className="status-texto">Missões Concluídas</span>
                        </div>
                        <div className="status-card">
                            <i className="fas fa-award icone-status"></i>
                            <span className="status-valor">Adicionar..</span>
                            <span className="status-texto">Conquistas</span>
                        </div>
                    </div>
                </section>

                <div className="paineis-inferiores">
                    {/* <!-- Painel de Missões --> */}
                    <section className="painel-missoes painel-card">
                        <header className="painel-header">
                            <div className="painel-titulo-wrapper">
                                <i className="fas fa-bullseye icone-painel"></i>
                                <h2>Missões</h2>
                            </div>
                            <a href="#" onClick={() => alteraVisualizacaoMissoes()} className="link-ver-todos">Ver todas</a>
                        </header>

                        <div className="abas-missoes">
                            <button className={`aba ${abaMissoes === 'diarias' ? 'ativa' : ''}`} onClick={() => alteraAbaMissoes('diarias')}>Diárias</button>
                            <button className={`aba ${abaMissoes === 'semanais' ? 'ativa' : ''}`} onClick={() => alteraAbaMissoes('semanais')}>Semanais</button>
                        </div>

                        <div className="lista-missoes">
                            {abaMissoes === 'diarias' ? (
                                <>
                                    <div className="missao-card">
                                        <i className="fas fa-comments icone-missao"></i>
                                        <div className="missao-info">
                                            <span className="nome-missao">Faça 3 comentários</span>
                                            <div className="missao-progresso-container">
                                                <div className="barra-missao-fundo">
                                                    <div className="barra-missao-progresso" style={{ width: "66%" }}></div>
                                                </div>
                                                <span className="missao-texto-progresso">2/3</span>
                                                <span className="xp-ganho">+50 XP</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="missao-card">
                                        <i className="fas fa-box-open icone-missao"></i>
                                        <div className="missao-info">
                                            <span className="nome-missao">Publique 1 item</span>
                                            <div className="missao-progresso-container">
                                                <div className="barra-missao-fundo">
                                                    <div className="barra-missao-progresso" style={{ width: "0%" }}></div>
                                                </div>
                                                <span className="missao-texto-progresso">0/1</span>
                                                <span className="xp-ganho">+100 XP</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="missao-card">
                                        <i className="fas fa-handshake icone-missao"></i>
                                        <div className="missao-info">
                                            <span className="nome-missao">Conclua 1 troca</span>
                                            <div className="missao-progresso-container">
                                                <div className="barra-missao-fundo">
                                                    <div className="barra-missao-progresso" style={{ width: "100%" }}></div>
                                                </div>
                                                <span className="missao-texto-progresso">1/1</span>
                                                <span className="xp-ganho">+200 XP</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="missao-card">
                                        <i className="fas fa-comments icone-missao"></i>
                                        <div className="missao-info">
                                            <span className="nome-missao">Faça 10 comentários</span>
                                            <div className="missao-progresso-container">
                                                <div className="barra-missao-fundo">
                                                    <div className="barra-missao-progresso" style={{ width: "50%" }}></div>
                                                </div>
                                                <span className="missao-texto-progresso">5/10</span>
                                                <span className="xp-ganho">+150 XP</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="missao-card">
                                        <i className="fas fa-box-open icone-missao"></i>
                                        <div className="missao-info">
                                            <span className="nome-missao">Publique 5 itens</span>
                                            <div className="missao-progresso-container">
                                                <div className="barra-missao-fundo">
                                                    <div className="barra-missao-progresso" style={{ width: "20%" }}></div>
                                                </div>
                                                <span className="missao-texto-progresso">1/5</span>
                                                <span className="xp-ganho">+300 XP</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="missao-card">
                                        <i className="fas fa-handshake icone-missao"></i>
                                        <div className="missao-info">
                                            <span className="nome-missao">Conclua 3 trocas</span>
                                            <div className="missao-progresso-container">
                                                <div className="barra-missao-fundo">
                                                    <div className="barra-missao-progresso" style={{ width: "66%" }}></div>
                                                </div>
                                                <span className="missao-texto-progresso">2/3</span>
                                                <span className="xp-ganho">+500 XP</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </section>

                    {/* <!-- Painel do Ranking --> */}
                    <section className="painel-ranking painel-card">
                        <header className="painel-header">
                            <div className="painel-titulo-wrapper">
                                <i className="fas fa-trophy icone-painel"></i>
                                <h2>Ranking dos Colecionadores</h2>
                            </div>
                            <a href="#" onClick={() => alteraVisualizacaoRanking()} className="link-ver-todos">Ver ranking completo</a>
                        </header>

                        <div className="lista-ranking">
                            {
                                rankingGameficacao?.map(i =>
                                    <div className="ranking-card">
                                        <span className={"posicao-" + num + "-lugar"}>1</span>
                                        <img src={i.id_usuario?.foto} alt="Foto usuário 1" />
                                        <span className="nome-ranking">{i.id_usuario.nome}</span>
                                        <span className="xp-ranking">{i.xp} XP</span>
                                    </div>
                                )
                            }
                        </div>
                    </section>

                    {/* <!-- Painel de Medalhas --> */}
                    <section className="painel-medalhas painel-card">
                        <header className="painel-header">
                            <div className="painel-titulo-wrapper">
                                <i className="fas fa-medal icone-painel"></i>
                                <h2>Medalhas</h2>
                            </div>
                            <a href="#" onClick={() => alteraVisualizacaoMedalhas()} className="link-ver-todos">Ver todas</a>
                        </header>

                        <div className="lista-medalhas">
                            <div className="medalha-card">
                                <i className="fas fa-medal icone-medalha-bronze"></i>
                                <div className="medalha-info">
                                    <span className="nome-medalha">Iniciante</span>
                                    <div className="progresso-medalha">
                                        <span className="desc-medalha">Faça sua primeira troca</span>
                                        <div className="barra-medalha-fundo">
                                            <div className="barra-medalha-progresso" style={{ width: "20%" }}></div>
                                        </div>
                                        <span className="medalha-texto-progresso">1/5</span>
                                    </div>
                                </div>
                            </div>
                            <div className="medalha-card">
                                <i className="fas fa-medal icone-medalha-prata"></i>
                                <div className="medalha-info">
                                    <span className="nome-medalha">Colecionador Ávido</span>
                                    <div className="progresso-medalha">
                                        <span className="desc-medalha">Publique 10 itens</span>
                                        <div className="barra-medalha-fundo">
                                            <div className="barra-medalha-progresso" style={{ width: "40%" }}></div>
                                        </div>
                                        <span className="medalha-texto-progresso">4/10</span>
                                    </div>
                                </div>
                            </div>
                            <div className="medalha-card">
                                <i className="fas fa-medal icone-medalha-prata"></i>
                                <div className="medalha-info">
                                    <span className="nome-medalha">Sociável</span>
                                    <div className="progresso-medalha">
                                        <span className="desc-medalha">Adicione 5 amigos</span>
                                        <div className="barra-medalha-fundo">
                                            <div className="barra-medalha-progresso" style={{ width: "80%" }}></div>
                                        </div>
                                        <span className="medalha-texto-progresso">4/5</span>
                                    </div>
                                </div>
                            </div>
                            <div className="medalha-card">
                                <i className="fas fa-medal icone-medalha-ouro"></i>
                                <div className="medalha-info">
                                    <span className="nome-medalha">Ambicioso</span>
                                    <div className="progresso-medalha">
                                        <span className="desc-medalha">Adicione 10 itens na lista de desejos</span>
                                        <div className="barra-medalha-fundo">
                                            <div className="barra-medalha-progresso" style={{ width: "80%" }}></div>
                                        </div>
                                        <span className="medalha-texto-progresso">6/10</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>


            </main>
                : <></>
            }
            <Rodape onNavigate={handleNavigate} />
        </div>
    );
}

export default Gameficacao;