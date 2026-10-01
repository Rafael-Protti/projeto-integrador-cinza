import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Planos.css";
import Navbar from '../Navbar.jsx'
import Rodape from '../Rodape.jsx'

function Planos() {
    const navigate = useNavigate();
    const handleNavigate = (path) => navigate(`/${path}`);
    const [modalInfo, setModalInfo] = useState(null);

    const openModal = (plan) => {
        setModalInfo(plan);
    };

    const closeModal = () => {
        setModalInfo(null);
    };

    return (
        <div>
            <Navbar onNavigate={handleNavigate} />

            <main className="main-content">
                <section className="title-section">
                    <div className="title-container">
                        <div className="title-decor-line"></div>
                        <h1>PLANOS</h1>
                        <div className="title-decor-line"></div>
                    </div>
                    <p className="subtitle">Escolha o plano ideal para você e evolua sem limites.</p>
                </section>


                <section className="plans-section">
                    <div className="plan-card basic-card">
                        <div className="card-icon-wrapper basic-icon">
                            <i className="fa-solid fa-rocket"></i>
                        </div>
                        <div className="plan-header">
                            <span className="plan-label">PLANO</span>
                            <h2 className="plan-title">BÁSICO</h2>
                            <p className="plan-desc">Ideal para começar</p>
                        </div>
                        <div className="plan-price">
                            <span className="currency">R$</span> <span className="amount">29,90</span> <span className="period">/mês</span>
                        </div>
                        <ul className="plan-features basic-features">
                            <li><i className="fa-solid fa-circle-check"></i> Acesso às funcionalidades básicas</li>
                            <li><i className="fa-solid fa-circle-check"></i> 1 usuário</li>
                            <li><i className="fa-solid fa-circle-check"></i> 5 GB de armazenamento</li>
                            <li><i className="fa-solid fa-circle-check"></i> Suporte por e-mail</li>
                            <li><i className="fa-solid fa-circle-check"></i> Atualizações básicas</li>
                            <li><i className="fa-solid fa-circle-check"></i> Relatórios simples</li>
                        </ul>
                        <button className="btn btn-basic" onClick={() => openModal({ title: 'BÁSICO', price: 'R$ 29,90/mês', desc: 'Ideal para começar' })}>ESCOLHER PLANO</button>
                    </div>


                    <div className="plan-card intermediate-card">
                        <div className="card-icon-wrapper intermediate-icon">
                            <i className="fa-solid fa-chart-line"></i>
                        </div>
                        <div className="plan-header">
                            <span className="plan-label">PLANO</span>
                            <h2 className="plan-title">INTERMEDIÁRIO</h2>
                            <p className="plan-desc">Mais recursos para você crescer</p>
                        </div>
                        <div className="plan-price">
                            <span className="currency">R$</span> <span className="amount">59,90</span> <span className="period">/mês</span>
                        </div>
                        <ul className="plan-features intermediate-features">
                            <li><i className="fa-solid fa-circle-check"></i> Todas do plano Básico</li>
                            <li><i className="fa-solid fa-circle-check"></i> 5 usuários</li>
                            <li><i className="fa-solid fa-circle-check"></i> 50 GB de armazenamento</li>
                            <li><i className="fa-solid fa-circle-check"></i> Suporte prioritário</li>
                            <li><i className="fa-solid fa-circle-check"></i> Atualizações avançadas</li>
                            <li><i className="fa-solid fa-circle-check"></i> Relatórios detalhados</li>
                            <li><i className="fa-solid fa-circle-check"></i> Integrações básicas</li>
                            <li><i className="fa-solid fa-circle-check"></i> Exportação de dados</li>
                        </ul>
                        <button className="btn btn-intermediate" onClick={() => openModal({ title: 'INTERMEDIÁRIO', price: 'R$ 59,90/mês', desc: 'Mais recursos para você crescer' })}>ESCOLHER PLANO</button>
                    </div>


                    <div className="plan-card advanced-card">
                        <div className="popular-badge"><i className="fa-solid fa-star"></i> MAIS POPULAR <i className="fa-solid fa-star"></i></div>
                        <div className="card-icon-wrapper advanced-icon">
                            <i className="fa-solid fa-rocket"></i>
                        </div>
                        <div className="plan-header">
                            <span className="plan-label">PLANO</span>
                            <h2 className="plan-title">AVANÇADO</h2>
                            <p className="plan-desc">Máximo desempenho e controle</p>
                        </div>
                        <div className="plan-price">
                            <span className="currency">R$</span> <span className="amount">99,90</span> <span className="period">/mês</span>
                        </div>
                        <ul className="plan-features advanced-features">
                            <li><i className="fa-solid fa-circle-check"></i> Todas do plano Intermediário</li>
                            <li><i className="fa-solid fa-circle-check"></i> Usuários ilimitados</li>
                            <li><i className="fa-solid fa-circle-check"></i> Armazenamento ilimitado</li>
                            <li><i className="fa-solid fa-circle-check"></i> Suporte 24/7</li>
                            <li><i className="fa-solid fa-circle-check"></i> Atualizações premium</li>
                            <li><i className="fa-solid fa-circle-check"></i> Relatórios personalizados</li>
                            <li><i className="fa-solid fa-circle-check"></i> Integrações avançadas</li>
                            <li><i className="fa-solid fa-circle-check"></i> Backup diário automático</li>
                            <li><i className="fa-solid fa-circle-check"></i> Segurança avançada</li>
                            <li><i className="fa-solid fa-circle-check"></i> Treinamentos e onboarding</li>
                        </ul>
                        <button className="btn btn-advanced" onClick={() => openModal({ title: 'AVANÇADO', price: 'R$ 99,90/mês', desc: 'Máximo desempenho e controle' })}>ESCOLHER PLANO</button>
                    </div>
                </section>


                <section className="info-section">
                    <div className="info-item">
                        <i className="fa-solid fa-lock info-icon"></i>
                        <div className="info-text">
                            <span>Segurança</span>
                            <span>de ponta</span>
                        </div>
                    </div>
                    <div className="info-divider"></div>
                    <div className="info-item">
                        <i className="fa-solid fa-cloud info-icon"></i>
                        <div className="info-text">
                            <span>Acesso em</span>
                            <span>qualquer lugar</span>
                        </div>
                    </div>
                    <div className="info-divider"></div>
                    <div className="info-item">
                        <i className="fa-solid fa-clock info-icon"></i>
                        <div className="info-text">
                            <span>99,9% de</span>
                            <span>disponibilidade</span>
                        </div>
                    </div>
                    <div className="info-divider"></div>
                    <div className="info-item">
                        <i className="fa-solid fa-headset info-icon"></i>
                        <div className="info-text">
                            <span>Suporte</span>
                            <span>especializado</span>
                        </div>
                    </div>
                </section>
            </main>

            {modalInfo !== null && (
                <div className="modal-overlay2" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Plano {modalInfo.title}</h2>
                        <p>{modalInfo.desc}</p>
                        <p className="modal-price">{modalInfo.price}</p>
                        <button className="btn btn-close" onClick={closeModal}>Fechar</button>
                    </div>
                </div>
            )}
            <Rodape onNavigate={handleNavigate} />
        </div>
    );
}

export default Planos;