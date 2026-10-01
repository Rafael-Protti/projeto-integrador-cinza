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

    const [medalhas, alteraMedalhas] = useState([])
    const [missoes, alteraMissoes] = useState([])

    const [usuarioGameficacao, alteraUsuarioGameficacao] = useState([])
    const [rankingGameficacao, alteraRankingGameficacao] = useState([])
    const [carregando, alteraCarregando] = useState(true)
    const usuarioAtual = 1;

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

    async function buscarUsuarioAutenticado() {

        alteraCarregando(true)

        const { error, data } = await supabase.from('gamificacao').select("*, id_usuario(nome, foto)").eq("id_usuario", usuarioAtual).single()
        alteraUsuarioGameficacao(data)
        console.log(data)

        alteraCarregando(false)

        calcularNivel(data?.xp)
    }

    async function buscarUsuariosRanking() {

        const { error, data } = await supabase.from('gamificacao').select("*, id_usuario(nome, foto)").order("xp", { ascending: false })
        alteraRankingGameficacao(data)
        console.log(data)

    }

    async function buscarMissoes() {
        const { error, data } = await supabase.from('missoes').select("*")
        alteraMissoes(data)
        console.log(data)
    }
    async function buscarMedalhas() {
        const { error, data } = await supabase.from('medalhas').select("*")
        alteraMedalhas(data)

        console.log(data)
    }

    useEffect(() => { /*copiar*/
        buscarUsuariosRanking()
        buscarMissoes()
        buscarMedalhas()
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
                        <div className="janelaFlutuanteFundo" onClick={(e) => { if(e.target === e.currentTarget) alteraVisualizacaoRanking(); }}>
                                <div className="janelaFlutuante lista-ranking">
                                    <h2> <i className="fas fa-trophy icone-painel"></i> Ranking dos Colecionadores <i className="fa-solid fa-x icone-x" onClick={() => alteraVisualizacaoRanking()}></i></h2>
                                {
                                    rankingGameficacao?.map(i => {
                                        const posicao = rankingGameficacao.indexOf(i) + 1;
                                        let classe;
                                        if (posicao > 3) { classe = "posicao"; }
                                        else { classe = "posicao-" + posicao + "-lugar"; }
                                        return (
                                            <div className="ranking-card" key={i.id}>
                                                <span className={classe}>{posicao}</span>
                                                <img src={i.id_usuario?.foto} alt="Foto usuário 1" />
                                                <span className="nome-ranking">{i.id_usuario.nome}</span>
                                                <span className="xp-ranking">{i.xp} XP</span>
                                            </div>
                                        )
                                    }
                                    )
                                }

                            </div>
                        </div>
                        : <></>
                }

                {
                    medalhasVisivel == true ?
                        <div className="janelaFlutuanteFundo" onClick={(e) => { if(e.target === e.currentTarget) alteraVisualizacaoMedalhas(); }}>
                            <div className="janelaFlutuante lista-medalhas">
                                 <h2> <i className="fas fa-medal icone-painel"></i> Todas as Medalhas <i className="fa-solid fa-x icone-x" onClick={() => alteraVisualizacaoMedalhas()}></i></h2>
                                {
                                    medalhas?.map(i => (

                                        <div className="medalha-card" key={i.id}>
                                            <i className={i.icone}></i>
                                            <div className="medalha-info">
                                                <span className="nome-medalha">{i.nome}</span>
                                                <div className="progresso-medalha">
                                                    <span className="desc-medalha">{i.descricao}</span>
                                                    <div className="barra-medalha-fundo">
                                                        <div className="barra-medalha-progresso" style={{ width: "0%" }}></div>
                                                    </div>
                                                    <span className="medalha-texto-progresso">0/{i.acoes}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        : <></>
                }

                {
                    missoesVisivel == true ?
                        <div className="janelaFlutuanteFundo" onClick={(e) => { if(e.target === e.currentTarget) alteraVisualizacaoMissoes(); }}>
                            <div className="janelaFlutuante lista-missoes   ">
                                <h2> <i className="fas fa-bullseye icone-missao"></i> Todas as Missões <i className="fa-solid fa-x icone-x" onClick={() => alteraVisualizacaoMissoes()}></i></h2>
                                {
                                    missoes?.map(i => (
                                        <div className="missao-card" key={i.id}>
                                            <i className={i.icone + " icone-missao"}></i>
                                            <div className="missao-info">
                                                <span className="nome-missao">{i.nome}</span>
                                                <div className="missao-progresso-container">
                                                    <div className="barra-missao-fundo">
                                                        <div className="barra-missao-progresso" style={{ width: "0%" }}></div>
                                                    </div>
                                                    <span className="missao-texto-progresso">0/{i.acoes}</span>
                                                    <span className="xp-ganho">{i.xp} XP</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
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
                            <span className="status-valor">0</span>
                            <span className="status-texto">Missões Concluídas</span>
                        </div>
                        <div className="status-card">
                            <i className="fas fa-award icone-status"></i>
                            <span className="status-valor">0</span>
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
                            <a href="#" onClick={(e) => { e.preventDefault(); alteraVisualizacaoMissoes(); }} className="link-ver-todos">Ver todas</a>
                        </header>

                        <div className="abas-missoes">
                            <button className={`aba ${abaMissoes === 'diarias' ? 'ativa' : ''}`} onClick={() => alteraAbaMissoes('diarias')}>Diárias</button>
                            <button className={`aba ${abaMissoes === 'semanais' ? 'ativa' : ''}`} onClick={() => alteraAbaMissoes('semanais')}>Semanais</button>
                        </div>

                        <div className="lista-missoes">
                            {abaMissoes === 'diarias' ? (
                                <>
                                    {
                                        missoes?.filter(i => i.periodo === "diaria").map(i => (
                                            <div className="missao-card" key={i.id}>
                                                <i className={i.icone + " icone-missao"}></i>
                                                <div className="missao-info">
                                                    <span className="nome-missao">{i.nome}</span>
                                                    <div className="missao-progresso-container">
                                                        <div className="barra-missao-fundo">
                                                            <div className="barra-missao-progresso" style={{ width: "0%" }}></div>
                                                        </div>
                                                        <span className="missao-texto-progresso">0/{i.acoes}</span>
                                                        <span className="xp-ganho">{i.xp} XP</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                            ) : (
                                <>
                                    {
                                        missoes?.filter(i => i.periodo === "semanal").map(i => (
                                            <div className="missao-card" key={i.id}>
                                                <i className={i.icone + " icone-missao"}></i>
                                                <div className="missao-info">
                                                    <span className="nome-missao">{i.nome}</span>
                                                    <div className="missao-progresso-container">
                                                        <div className="barra-missao-fundo">
                                                            <div className="barra-missao-progresso" style={{ width: "0%" }}></div>
                                                        </div>
                                                        <span className="missao-texto-progresso">0/{i.acoes}</span>
                                                        <span className="xp-ganho">{i.xp} XP</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
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
                            <a href="#" onClick={(e) => { e.preventDefault(); alteraVisualizacaoRanking(); }} className="link-ver-todos">Ver ranking completo</a>
                        </header>

                        <div className="lista-ranking">
                            {
                                rankingGameficacao?.map(i => {
                                    const posicao = rankingGameficacao.indexOf(i) + 1;
                                    let classe;
                                    if (posicao > 3) { classe = "posicao"; }
                                    else { classe = "posicao-" + posicao + "-lugar"; }
                                    if (posicao > 5) return;
                                    return (
                                        <div className="ranking-card" key={i.id}>
                                            <span className={classe}>{posicao}</span>
                                            <img src={i.id_usuario?.foto} alt="Foto usuário 1" />
                                            <span className="nome-ranking">{i.id_usuario.nome}</span>
                                            <span className="xp-ranking">{i.xp} XP</span>
                                        </div>
                                    )
                                }
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
                            <a href="#" onClick={(e) => { e.preventDefault(); alteraVisualizacaoMedalhas(); }} className="link-ver-todos">Ver todas</a>
                        </header>
                        <div className="lista-medalhas">
                            {
                                medalhas?.slice(0, 3).map(i => (
                                    <div className="medalha-card" key={i.id}>
                                        <i className={i.icone}></i>
                                        <div className="medalha-info">
                                            <span className="nome-medalha">{i.nome}</span>
                                            <div className="progresso-medalha">
                                                <span className="desc-medalha">{i.descricao}</span>
                                                <div className="barra-medalha-fundo">
                                                    <div className="barra-medalha-progresso" style={{ width: "0%" }}></div>
                                                </div>
                                                <span className="medalha-texto-progresso">0/{i.acoes}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </section>
                </div>


            </main >
                : <></>
            }
            <Rodape onNavigate={handleNavigate} />
        </div >
    );
}

export default Gameficacao;