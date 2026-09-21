# Tela de exibição de produtos
**Nome do Arquivo Principal:**
   - Salve o arquivo principal do projeto como `index.html`, salvando ele na mesma pasta.

**Padrão de Código e Estrutura Semântica:**
   - Utilize HTML e CSS (apenas, sem javascript)
   - Mantenha o CSS limpo, estruturado e com variáveis CSS para cores e fontes principais.

## 1. Visão Geral e Paleta de Cores
- **Tema:** Dark Header (Topo escuro) com Corpo Claro e Destaques em Azul.
- **Cores Principais:**
  - **Header Superior (TopBar):** Fundo Preto/Cinza bem escuro (`#0f0f0f` ou `#121212`), texto branco.
  - **Background Geral / Container Principal:** Fundo Cinza muito claro (`#f5f7fa` / `#ffffff`).
  - **Ações / Destaques (Accent):** Azul vibrante (`#0d6efd` ou `#1a56db`).
  - **Rodapé (Footer):** Azul vibrante (combinando com os botões de ação).

---

## 2. Componentes da Interface

### A. Barra Superior (Top Navigation Bar / Header Escuro)
- **Fundo:** Escuro (Preto/Cinza Escuro).
- **Conteúdo da esquerda para a direita:**
  1. **Logo / Título:** "Nome do site" (Texto em negrito, cor branca, alinhado à esquerda).
  2. **Barra de Pesquisa (Search Bar):**
     - Campo de texto arredondado com fundo branco.
     - Placeholder: `"Barra de pesquisa"`.
     - Ícone de lupa (search icon) no canto direito dentro ou ao lado do input.
  3. **Ícones de Notificação:**
     - Ícone de Sino (Notificações).
     - Ícone de Envelope (Mensagens/Caixa de Entrada).
     - Ambos em botões arredondados com fundo claro/branco.
  4. **Ação de Usuário (Auth):**
     - Botão em tom **Azul**: Ícone de Usuário + Texto `"Login/Cadastro"`.

---

### B. Menu de Navegação Secundário (Tabs / Sub-header)
- **Fundo:** Branco / Claro com linha divisória inferior.
- **Estilo:** Abas / Tabs horizontais centralizadas ou distribuídas.
- **Itens do Menu:**
  - **Itens** *(Aba ativa com indicador azul em baixo)*
  - **Histórico**
  - **Conquistas**
  - **Rankings**
  - **Planos**
  - **Livros**
  - **CDs**
  - **Cartinhas**

---

### C. Carrossel de Imagens (Banner / Hero Section)
- **Container:** Caixa grande centralizada com borda suave ou sombra leve e fundo cinza-claro.
- **Elementos do Carrossel:**
  - **Botão Esquerda:** Ícone de seta para esquerda (`<-`) sobre quadrado azul.
  - **Área Central:** Ícone de imagem em destaque + Texto `"Carrossel de imagens"`.
  - **Botão Direita:** Ícone de seta para direita (`->`) sobre quadrado azul.
  - **Indicador de Páginas (Paginação/Dots):**
    - 3 pontos logo abaixo do container (O 1º ponto na cor azul indicando ativo, os demais cinza).

---

### D. Seção do Catálogo ("Cards dos produtos")
- **Título da Seção:** `"Cards dos produtos"` (Centralizado, em negrito).
- **Grid de Produtos:** Layout em grid responsivo de **4 colunas**.
- **Estrutura de cada Card de Produto:**
  1. **Área de Imagem do Produto:** Bloco superior em cinza claro com ícone de placeholder de imagem.
  2. **Nome do Produto:** Texto `"Nome do produto"` (Em negrito, centralizado).
  3. **Categoria:** Texto `"Categoria"` (Fonte menor/cinza, centralizado).
  4. **Preço:** Texto `"R$ 0,00"` (Em destaque azul, negrito, centralizado).
  5. **Botão de Ação:** Botão azul de largura total (`width: 100%`) com ícone de carrinho de compras (`🛒`) + texto `"Ver produto"`.

---

### E. Rodapé (Footer)
- **Fundo:** Azul vibrante cobrindo toda a largura.
- **Elementos:**
  1. **Tag/Bloco Central:** Retângulo com fundo branco e texto `"Rodapé"`.
  2. **Copyright:** Texto em branco centralizado: `"© 2025 Nome do site. Todos os direitos reservados."`

