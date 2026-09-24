import "./Gameficacao.css"

function Gameficacao() {
    return (
        <div>
            {/* <nav className="navbar">
                <a href="#" className="logo">Colecionáveis</a>

                <div className="search-bar">
                    <span className="search-text">Digite para pesquisa</span>
                    <i className="fas fa-search search-icon"></i>
                </div>

                <div className="nav-actions">
                    <a href="#" className="btn-notification">
                        <i className="fas fa-bell"></i>
                    </a>
                    <a href="#" className="btn-messages">
                        <i className="fas fa-envelope"></i>
                    </a>
                    <a href="#" className="btn-login">
                        <i className="fas fa-user"></i>
                        <span>Login/Cadastro</span>
                    </a>
                </div>
            </nav> */}

            <main className="conteudo">
                <header className="titulo-pagina">
                    <div className="titulo-wrapper">
                        <i className="fas fa-trophy icone-titulo"></i>
                        <h1>Gameficação</h1>
                    </div>
                    <p className="desc-titulo">Acompanhe seu progresso e conquiste recompensas!</p>
                </header>

                <section className="painel-perfil">
                    <div className="perfil-esquerdo">
                        <img src="https://placehold.co/100x100" alt="Foto do usuário" className="foto-usuario"/>
                            <div className="info-usuario">
                                <h2 className="nome-usuario">Nome do Usuário</h2>
                                <span className="nivel-texto">Nível 5</span>

                                <div className="xp-container">
                                    <div className="barra-xp-fundo">
                                        <div className="barra-xp-progresso" style={{width: "65%"}}></div>
                                    </div>
                                    <span className="xp-quantia"><span className="xp-atual">6500</span><span className="xp-total">/10000
                                        XP</span></span>
                                </div>

                                <p className="xp-faltante">Faltam 3500 XP para o próximo nível</p>
                            </div>
                    </div>

                    <div className="painel-status">
                        <div className="status-card">
                            <i className="fas fa-star icone-status"></i>
                            <span className="status-valor">6500</span>
                            <span className="status-texto">XP Total</span>
                        </div>
                        <div className="status-card">
                            <i className="fas fa-chart-line icone-status"></i>
                            <span className="status-valor">5</span>
                            <span className="status-texto">Nível Atual</span>
                        </div>
                        <div className="status-card">
                            <i className="fas fa-bullseye icone-status"></i>
                            <span className="status-valor">12</span>
                            <span className="status-texto">Missões Concluídas</span>
                        </div>
                        <div className="status-card">
                            <i className="fas fa-award icone-status"></i>
                            <span className="status-valor">4</span>
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
                            <a href="#" className="link-ver-todos">Ver todas</a>
                        </header>

                        <div className="abas-missoes">
                            <button className="aba ativa">Diárias</button>
                            <button className="aba">Semanais</button>
                        </div>

                        <div className="lista-missoes">
                            <div className="missao-card">
                                <i className="fas fa-comments icone-missao"></i>
                                <div className="missao-info">
                                    <span className="nome-missao">Faça 3 comentários</span>
                                    <div className="missao-progresso-container">
                                        <div className="barra-missao-fundo">
                                            <div className="barra-missao-progresso" style={{width: "66%"}}></div>
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
                                            <div className="barra-missao-progresso" style={{width: "0%"}}></div>
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
                                            <div className="barra-missao-progresso" style={{width: "100%"}}></div>
                                        </div>
                                        <span className="missao-texto-progresso">1/1</span>
                                        <span className="xp-ganho">+200 XP</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* <!-- Painel do Ranking --> */}
                    <section className="painel-ranking painel-card">
                        <header className="painel-header">
                            <div className="painel-titulo-wrapper">
                                <i className="fas fa-trophy icone-painel"></i>
                                <h2>Ranking dos Colecionadores</h2>
                            </div>
                            <a href="#" className="link-ver-todos">Ver ranking completo</a>
                        </header>

                        <div className="lista-ranking">
                            <div className="ranking-card">
                                <span className="posicao-1-lugar">1</span>
                                <img src="https://placehold.co/40x40" alt="Foto usuário 1"/>
                                    <span className="nome-ranking">João Silva</span>
                                    <span className="xp-ranking">12000 XP</span>
                            </div>
                            <div className="ranking-card">
                                <span className="posicao-2-lugar">2</span>
                                <img src="https://placehold.co/40x40" alt="Foto usuário 2"/>
                                    <span className="nome-ranking">Maria Oliveira</span>
                                    <span className="xp-ranking">11500 XP</span>
                            </div>
                            <div className="ranking-card">
                                <span className="posicao-3-lugar">3</span>
                                <img src="https://placehold.co/40x40" alt="Foto usuário 3"/>
                                    <span className="nome-ranking">Carlos Santos</span>
                                    <span className="xp-ranking">10200 XP</span>
                            </div>
                            <div className="ranking-card">
                                <span className="posicao">4</span>
                                <img src="https://placehold.co/40x40" alt="Foto usuário 4"/>
                                    <span className="nome-ranking">Ana Souza</span>
                                    <span className="xp-ranking">9800 XP</span>
                            </div>
                            <div className="ranking-card">
                                <span className="posicao">5</span>
                                <img src="https://placehold.co/40x40" alt="Foto usuário 5"/>
                                    <span className="nome-ranking">Pedro Costa</span>
                                    <span className="xp-ranking">8500 XP</span>
                            </div>
                        </div>
                    </section>

                    {/* <!-- Painel de Medalhas --> */}
                    <section className="painel-medalhas painel-card">
                        <header className="painel-header">
                            <div className="painel-titulo-wrapper">
                                <i className="fas fa-star icone-painel"></i>
                                <h2>Medalhas</h2>
                            </div>
                            <a href="#" className="link-ver-todos">Ver todas</a>
                        </header>

                        <div className="lista-medalhas">
                            <div className="medalha-card">
                                <i className="fas fa-medal icone-medalha-bronze"></i>
                                <div className="medalha-info">
                                    <span className="nome-medalha">Iniciante</span>
                                    <div className="progresso-medalha">
                                        <span className="desc-medalha">Faça sua primeira troca</span>
                                        <div className="barra-medalha-fundo">
                                            <div className="barra-medalha-progresso" style={{width: "20%"}}></div>
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
                                            <div className="barra-medalha-progresso" style={{width: "40%"}}></div>
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
                                            <div className="barra-medalha-progresso" style={{width: "80%"}}></div>
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
                                            <div className="barra-medalha-progresso" style={{width: "80%"}}></div>
                                        </div>
                                        <span className="medalha-texto-progresso">6/10</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* <footer className="rodape">
                <div className="rodape-conteudo">
                    <span className="ano-criacao">© 2026</span>
                    <span className="logo-rodape">Colecionáveis</span>
                </div>
            </footer> */}
        </div>
    );
}

export default Gameficacao;