# Concluído
- Catálogo carrega produtos ativos do Supabase com a categoria relacionada; mantém os dados de demonstração como fallback em caso de erro.
- Catálogo carrega filtros da tabela `categorias` e atualiza a lista em tempo real via Supabase Realtime.
- Navbar e rodapé compartilhados nas páginas de produtos, planos, perfil e gamificação; login exibe somente o rodapé.
- Cadastro insere nome, e-mail e senha em `public.usuarios`; login consulta e-mail e senha nessa tabela, guarda apenas o ID em `localStorage` até o encerramento da sessão e direciona para `/perfil`, que carrega os dados do usuário e calcula o número de trocas pelos registros concluídos (`status = true`) de `public.trocados` associados ao usuário. O perfil atualiza essa contagem em tempo real quando os registros de trocas mudam. Leituras de sessão aceitam também IDs antigos em `sessionStorage`.
- Perfil exibe em “Seus Trocados” os produtos associados aos registros concluídos de `public.trocados` do usuário autenticado, incluindo nome, imagem e categoria; a lista e a contagem são atualizadas em tempo real.
- Perfil permite atualizar a foto colando uma URL direta de imagem; ao salvar, grava `foto` junto aos dados cadastrais na linha do usuário em `public.usuarios`.
- Perfil inclui a seção “Seus Itens” antes de “Seus Trocados”; permite cadastrar produto com nome, descrição, categoria existente, URL opcional da imagem e quantidade em `public.produtos`, associado ao usuário conectado. O cadastro envia `xp = 0` e `ativo = true` para atender ao schema atual.
- Carrinho do catálogo armazena itens no navegador, abre como barra lateral e oferece contato direto com cada vendedor (nome, e-mail e telefone de `usuarios`) somente após login; login retorna ao carrinho e a sessão fica persistente até "Encerrar sessão" no perfil.
- Logo da navbar e link "Início" do rodapé navegam para `/`, a página inicial de produtos.
