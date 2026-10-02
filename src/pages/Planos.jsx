import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Planos.css";
import Navbar from '../Navbar.jsx';
import Rodape from '../Rodape.jsx';
import { supabase } from "../supabase.js";

function Planos() {
    const navigate = useNavigate();
    const handleNavigate = (path) => navigate(`/${path}`);
    const [modalInfo, setModalInfo] = useState(null);
    const [planos, alteraPlanos] = useState([]);
    const [compraFinalizada, setCompraFinalizada] = useState(false);

    async function buscarPlanos () {
        const {error, data} = await supabase.from("planos").select("*")
        console.log(data)
        alteraPlanos(data)
    }

    const openModal = (plan) => {
        setModalInfo(plan);
    };

    const closeModal = () => {
        setModalInfo(null);
        setCompraFinalizada(false);
    };

    const handleComprar = () => {
        setCompraFinalizada(true);
    };

    useEffect(() => {
        buscarPlanos()
    }, [] )

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
                            <h2 className="plan-title">{planos[0]?.nome}</h2>
                            <p className="plan-desc">Ideal para começar</p>
                        </div>
                        <div className="plan-price">
                            <span className="currency">R$</span> <span className="amount">{planos[0]?.preco}</span> <span className="period">/mês</span>
                        </div>
                        <ul className="plan-features basic-features">
                            <li><i className="fa-solid fa-circle-check"></i> {planos[0]?.descricao}</li>
                        </ul>
                        <button className="btn btn-basic" onClick={() => { setCompraFinalizada(false); openModal({ title: planos[0]?.nome, price: `R$ ${planos[0]?.preco}/mês`, desc: planos[0]?.descricao, type: 'basic' })}}>ESCOLHER PLANO</button>
                    </div>


                    <div className="plan-card advanced-card">
                        <div className="popular-badge"><i className="fa-solid fa-star"></i> MAIS POPULAR <i className="fa-solid fa-star"></i></div>
                        <div className="card-icon-wrapper advanced-icon">
                            <i className="fa-solid fa-rocket"></i>
                        </div>
                        <div className="plan-header">
                            <h2 className="plan-title">{planos[1]?.nome}</h2>
                            <p className="plan-desc">Máximo desempenho e controle</p>
                        </div>
                        <div className="plan-price">
                            <span className="currency">R$</span> <span className="amount">{planos[1]?.preco}</span> <span className="period">/mês</span>
                        </div>
                        <ul className="plan-features advanced-features">
                            <li><i className="fa-solid fa-circle-check"></i> {planos[1]?.descricao}</li>
                        </ul>
                        <button className="btn btn-advanced" onClick={() => { setCompraFinalizada(false); openModal({ title: planos[1]?.nome, price: `R$ ${planos[1]?.preco}/mês`, desc: planos[1]?.descricao, type: 'advanced' })}}>ESCOLHER PLANO</button>
                    </div>


                    <div className="plan-card intermediate-card">
                        <div className="card-icon-wrapper intermediate-icon">
                            <i className="fa-solid fa-chart-line"></i>
                        </div>
                        <div className="plan-header">
                            <h2 className="plan-title">{planos[2]?.nome}</h2>
                            <p className="plan-desc">Mais recursos para você crescer</p>
                        </div>
                        <div className="plan-price">
                            <span className="currency">R$</span> <span className="amount">{planos[2]?.preco}</span> <span className="period">/mês</span>
                        </div>
                        <ul className="plan-features intermediate-features">
                            <li><i className="fa-solid fa-circle-check"></i> {planos[2]?.descricao}</li>
                        </ul>
                        <button className="btn btn-intermediate" onClick={() => { setCompraFinalizada(false); openModal({ title: planos[2]?.nome, price: `R$ ${planos[2]?.preco}/mês`, desc: planos[2]?.descricao, type: 'intermediate' })}}>ESCOLHER PLANO</button>
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
                    <div className={`modal-content modal-${modalInfo.type}`} onClick={(e) => e.stopPropagation()}>
                        <h2>{modalInfo.title}</h2>
                        <p>{modalInfo.desc}</p>
                        <p className="modal-price">{modalInfo.price}</p>
                        
                        {compraFinalizada && (
                            <div className="success-message">Compra finalizada!</div>
                        )}

                        <div className="modal-buttons">
                            <button className="btn btn-close" onClick={closeModal}>Fechar</button>
                            <button className="btn btn-buy" onClick={handleComprar}>COMPRAR</button>
                        </div>
                    </div>
                </div>
            )}
            <Rodape onNavigate={handleNavigate} />
        </div>
    );
}

export default Planos;