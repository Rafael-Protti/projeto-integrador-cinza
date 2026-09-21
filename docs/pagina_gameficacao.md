# Página de Gameficação
## Introdução
Essa é a página de Gameficação do site de trocas de itens colecionáveis;
O usuário acessa essa página depois de entrar no seu perfil e clicar em um botão que redireciona para a página de gameficação.

## Instruções
### Considerações Iniciais
- Leia o arquivo `contexto_protti.md` para entender o contexto do site, encontrado na pasta `Docs`, se ainda não foi feito.
- Crie um arquivo HTML com o nome `gameficacao.html` ou edite se já existir.
- Crie um arquivo CSS com o nome `gameficacao.css` ou edite se já existir.
- **Não crie ou edite demais arquivos**.
- Esse site é composto por **Navbar**, **Conteúdo** e **Rodapé**.
- Dentro do conteúdo se encontram o **fundo principal**, o **título**, o **painel do perfil**, o **painel de missões**, o **painel do ranking de colecionadores** e o **painel de medalhas**. O título e o painel de usuário ocupam a parte superior do site. Os últimos 3 formam uma linha única (painel de missões, painel do ranking de colecionadores e painel de medalhas), que ocupa o meio para a parte inferior do site. Todos esses elementos aparecem na tela do usuário, **sem precisar de scroll**.
- Imagens solicitadas que não existem devem ser subtituídas por placeholders do site `placehold.co`.
- Links de páginas que não existem devem redirecionar para essa mesma página;
- Siga as etapas a seguir para estruturar a página:

### Navbar
A barra de navegação é compartilhada entre as páginas. Por hora, cada página cria do zero sua Navbar.

A Navbar é composta por:

- **Logo do site**;
    - Na esquerda, com um hyperlink direcionando para a página inicial;
    - Grande com destaque;

- **Campo de pesquisa**;
    - Centralizado;
    - Fundo branco;
    - Escrito 'Digite para pesquisa' em cinza escuro no lado esquerdo;
    - Ícone de lupa no lado direito, cinza escuro;

- **Botão de notificação**;
    - Ícone de sino, branco;
    - Fundo cinza escuro, transparente;
    - Bordas levemente arredondadas;
    - Direciona para a página de notificações.
- **Botão de mensagens**;

    - Ícone de envelope, branco;
    - Fundo cinza escuro, transparente;
    - Bordas levemente arredondadas;
    - Direciona para a página de mensagens.

- **Botão de Login/Cadastro**;
    - Ícone de usuário na esquerda, branco;
    - Texto em branco escrito 'Login/Cadastro';
    - Direciona para página de Login/Cadastro;
    - Fundo azul;
    - Bordas levemente arredondadas;

- **Fundo da Navbar**:
    - Preto.

### Fundo do site
O fundo do site é um cinza bem claro.

### Título
O título contém 3 elementos:

- **Ícone de troféu**;
    - Esquerda do site;
    - Azul.

- **Título**: 'Gameficação';
    - Esquerda do site, logo após o ícone de troféu;
    - Letras grandes;
    - Fonte preta;

- **Texto descritivo**: 'Acompanhe seu progresso e conquiste recompensas!'
    - Esquerda do site, logo abaixo do título;
    - Texto cinza escuro, pequeno;

### Painel do Perfil
O painel do perfil é centralizado na página, em formato retângular, maior na horizontal e possui um fundo próprio na cor branca.

Ele é estruturado da seguinte forma:

- **Foto do usuário**;
    - Círculo;
    - Esquerda do painel;
    - Ocupa quase toda a altura do painel;

- **Nome do usuário**;
    - Esquerda superior do painel;
    - Logo após a foto;
    - Fonte grande e na cor preto.

- **Texto do nível atual**;
    - Escrito 'Nível X';
    - Fonte média;
    - Texto azul;
    - Abaixo do nome e na frente da foto.

- **Barra de XP**;
    - Abaixo do texto do nível atual e na frente da foto;
    - A barra tem preenchimento em azul quando está em progresso;
    - A cor de fundo da barra vazia é cinza claro;
    - A barra é arredondada;
    - O tamanho da barra ocupa ~22% da tela.

- **Texto com a quantia de XP e quanto falta para o próximo nível**: 'quantia_atual/quantia_total XP';
    - Na frente da barra de XP;
    - A 'quantia_atual' fica na cor preta;
    - A '/quantia_total XP' fica na cor cinza claro;
    - Fonte tamanho média para pequena.

- **Texto com a quantia faltante para próximo nível**: 'Faltam X XP para o próximo nível';
    - Abaixo da barra de XP e na frente da foto;
    - Letra cinza escuro;
    - Fonte tamanho pequena.

- **Painel de status**:

    Esse painel ocupa 50% do espaço do painel do perfil, ficando na direira da tela, após o texto mais distante da estrutura acima (Texto com quantia de XP).
    Essa parte, possui 4 cards, com 3 linhas cada:

    - **XP atual**;
        - Ícone de XP, em azul (topo);
        - Quantia atual, em preto (meio);
        - Texto 'XP Total', em cinza escuro (baixo).

    - **Nível atual**;
        - Ícone de gráfico, azul (topo);
        - Número do nível, em preto (meio);
        - Texto 'Nível Atual', em cinza escuro (baixo).

    - **Missões Concluídas**;
        - Ícone de alvo, azul (topo);
        - Quantia de missões, em preto (meio);
        - Texto 'Missões Concluídas', em cinza escuro (baixo).

    - **Conquistas**;
        - Ícone de troféu, azul (topo);
        - Quantia de conquistas, em preto (meio);
        - Texto 'Conquistas', em cinza escuro (baixo).

### Painel das Missões
O painel de missões é o primeiro dos 3 cards que compõem a parte média - inferior do site.
Se encontra na esquerda do site, abaixo do painel de perfil.

Ele tem os seguintes elementos:

- **Ícone de tiro ao alvo**;
    - Azul;
    - Esquerda;
    - Tamanho pequeno.

- **Título**: 'Missões';
    - Em preto, fonte média-pequena;
    - Em frente ao ícone;

- **Link**: 'Ver todas';
    - No lado direito superior do painel;
    - Direciona para a página de missões;
    - Letra azul;
    - Fonte tamanho pequena.

- **Menu com 2 abas**:
    - Ocupa 80% do tamanho do Painel de missões, ficando ao centro;
    - Aba 'Diárias', na esquerda;        
    - Aba 'Semanais', na direita'.
    - Cada aba possui 3 cards retãngulares de missões em lista, só é possível ver os cards correspondes da aba selecionada.
    - Os cards possuem:

       - Ícone em azul, na esquerda;
       - Nome da missão em preto, na frente do ícone e na parte superior do card;
       - Barra de completude da missão (igual a `barra de xp`), abaixo do nome e do lado direito do ícone;
       - Texto do número de ações necessárias para completar missão (exemplo: 3/5), na frente da barra de completude, em cinza escuro;
       - XP ganho com a missão, em azul, na frente do texto do número e parte mais da direita do card (exemplo: +5 XP);

### Painel do Ranking de Colecionadores
Esse painel é o segundo dos 3 cards que compõem a parte média - inferior do site.
Se encontra no centro do site, abaixo do painel de perfil e na frente do painel de missões.
Sua estrutura:

- **Ícone de troféu**;
    - Azul;
    - Esquerda;
    - Tamanho pequeno.

- **Título**: 'Ranking dos Colecionadores';
    - Em preto, fonte média-pequena;
    - Em frente ao ícone;

- **Link**: 'Ver ranking completo';
    - No lado direito superior do painel;
    - Direciona para a página de ranking;
    - Letra azul;
    - Fonte tamanho pequena.

- **Cards dos usuários do ranking em lista:**
    - Ícone do número da colocação, à esquerda;
    - Foto, na frente do ícone;
    - Nome, na frente da foto, fonte preta e tamanho médio-pequeno;
    - Quantidade XP, na direita do card, em azul, mesmo tamanho do nome (exemplo: 12000 XP);
    - Aparecem 5 cards na lista de cada vez, ordenados pela quantidade de XP (maior para menor).

### Painel de Medalhas
Esse é o terceiro dos 3 cards que compõem a parte média - inferior do site.
Se encontra na direita do site, após o painel do ranking de colecionadores e abaixo do painel de perfil.
Esse painel exibe as medalhas que o usuário pode conquistar através de missões.

Estrutura:

- **Ícone de estrela**;
    - Azul;
    - Na esquerda;

- **Título**: 'Medalhas';
    - Em preto, fonte média-pequena;
    - Em frente ao ícone;

- **Link**: 'Ver todas';
    - No lado direito superior do painel;
    - Direciona para a página de medalhas;  
    - Letra azul;
    - Fonte tamanho pequena.

- **Cards das medalhas:**
    - Ícone da medalha, na esquerda;
    - Nome da medalha, na frente do ícone, pouco acima no card, fonte preta e tamanho médio-pequeno;
    - Descrição da conquista, na frente do ícone e abaixo do nome da medalha, fonte cinza-escuro e tamanho pequeno;
    - Barra de progresso, igual a `barra de xp`, lado direito do card;

### Rodapé
O rodapé também será compartilho por todas as páginas, mas por hora cada página tem o seu.
Cor de fundo azul.
Há o ano de criação do site e o logo do site centralizados no rodapé.


- cor nos icones
- contorno dos status
- navbar

