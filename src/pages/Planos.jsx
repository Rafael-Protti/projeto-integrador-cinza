import "./Planos.css";

function Planos() {
  return ( 
    <div>
      
    <main class="main-content">
        <section class="title-section">
            <div class="title-container">
                <div class="title-decor-line"></div>
                <h1>PLANOS</h1>
                <div class="title-decor-line"></div>
            </div>
            <p class="subtitle">Escolha o plano ideal para você e evolua sem limites.</p>
        </section>

     
        <section class="plans-section">
            <div class="plan-card basic-card">
                <div class="card-icon-wrapper basic-icon">
                    <i class="fa-solid fa-rocket"></i>
                </div>
                <div class="plan-header">
                    <span class="plan-label">PLANO</span>
                    <h2 class="plan-title">BÁSICO</h2>
                    <p class="plan-desc">Ideal para começar</p>
                </div>
                <div class="plan-price">
                    <span class="currency">R$</span> <span class="amount">29,90</span> <span class="period">/mês</span>
                </div>
                <ul class="plan-features basic-features">
                    <li><i class="fa-solid fa-circle-check"></i> Acesso às funcionalidades básicas</li>
                    <li><i class="fa-solid fa-circle-check"></i> 1 usuário</li>
                    <li><i class="fa-solid fa-circle-check"></i> 5 GB de armazenamento</li>
                    <li><i class="fa-solid fa-circle-check"></i> Suporte por e-mail</li>
                    <li><i class="fa-solid fa-circle-check"></i> Atualizações básicas</li>
                    <li><i class="fa-solid fa-circle-check"></i> Relatórios simples</li>
                </ul>
                <button class="btn btn-basic">ESCOLHER PLANO</button>
            </div>

         
            <div class="plan-card intermediate-card">
                <div class="card-icon-wrapper intermediate-icon">
                    <i class="fa-solid fa-chart-line"></i>
                </div>
                <div class="plan-header">
                    <span class="plan-label">PLANO</span>
                    <h2 class="plan-title">INTERMEDIÁRIO</h2>
                    <p class="plan-desc">Mais recursos para você crescer</p>
                </div>
                <div class="plan-price">
                    <span class="currency">R$</span> <span class="amount">59,90</span> <span class="period">/mês</span>
                </div>
                <ul class="plan-features intermediate-features">
                    <li><i class="fa-solid fa-circle-check"></i> Todas do plano Básico</li>
                    <li><i class="fa-solid fa-circle-check"></i> 5 usuários</li>
                    <li><i class="fa-solid fa-circle-check"></i> 50 GB de armazenamento</li>
                    <li><i class="fa-solid fa-circle-check"></i> Suporte prioritário</li>
                    <li><i class="fa-solid fa-circle-check"></i> Atualizações avançadas</li>
                    <li><i class="fa-solid fa-circle-check"></i> Relatórios detalhados</li>
                    <li><i class="fa-solid fa-circle-check"></i> Integrações básicas</li>
                    <li><i class="fa-solid fa-circle-check"></i> Exportação de dados</li>
                </ul>
                <button class="btn btn-intermediate">ESCOLHER PLANO</button>
            </div>

          
            <div class="plan-card advanced-card">
                <div class="popular-badge"><i class="fa-solid fa-star"></i> MAIS POPULAR <i class="fa-solid fa-star"></i></div>
                <div class="card-icon-wrapper advanced-icon">
                    <i class="fa-solid fa-rocket"></i>
                </div>
                <div class="plan-header">
                    <span class="plan-label">PLANO</span>
                    <h2 class="plan-title">AVANÇADO</h2>
                    <p class="plan-desc">Máximo desempenho e controle</p>
                </div>
                <div class="plan-price">
                    <span class="currency">R$</span> <span class="amount">99,90</span> <span class="period">/mês</span>
                </div>
                <ul class="plan-features advanced-features">
                    <li><i class="fa-solid fa-circle-check"></i> Todas do plano Intermediário</li>
                    <li><i class="fa-solid fa-circle-check"></i> Usuários ilimitados</li>
                    <li><i class="fa-solid fa-circle-check"></i> Armazenamento ilimitado</li>
                    <li><i class="fa-solid fa-circle-check"></i> Suporte 24/7</li>
                    <li><i class="fa-solid fa-circle-check"></i> Atualizações premium</li>
                    <li><i class="fa-solid fa-circle-check"></i> Relatórios personalizados</li>
                    <li><i class="fa-solid fa-circle-check"></i> Integrações avançadas</li>
                    <li><i class="fa-solid fa-circle-check"></i> Backup diário automático</li>
                    <li><i class="fa-solid fa-circle-check"></i> Segurança avançada</li>
                    <li><i class="fa-solid fa-circle-check"></i> Treinamentos e onboarding</li>
                </ul>
                <button class="btn btn-advanced">ESCOLHER PLANO</button>
            </div>
        </section>

    
        <section class="info-section">
            <div class="info-item">
                <i class="fa-solid fa-lock info-icon"></i>
                <div class="info-text">
                    <span>Segurança</span>
                    <span>de ponta</span>
                </div>
            </div>
            <div class="info-divider"></div>
            <div class="info-item">
                <i class="fa-solid fa-cloud info-icon"></i>
                <div class="info-text">
                    <span>Acesso em</span>
                    <span>qualquer lugar</span>
                </div>
            </div>
            <div class="info-divider"></div>
            <div class="info-item">
                <i class="fa-solid fa-clock info-icon"></i>
                <div class="info-text">
                    <span>99,9% de</span>
                    <span>disponibilidade</span>
                </div>
            </div>
            <div class="info-divider"></div>
            <div class="info-item">
                <i class="fa-solid fa-headset info-icon"></i>
                <div class="info-text">
                    <span>Suporte</span>
                    <span>especializado</span>
                </div>
            </div>
        </section>
    </main>

    </div>
   );
}

export default Planos;