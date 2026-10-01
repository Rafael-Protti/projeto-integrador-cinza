# Concluído
- Catálogo carrega produtos ativos do Supabase com a categoria relacionada; mantém os dados de demonstração como fallback em caso de erro.
- Catálogo carrega filtros da tabela `categorias` e atualiza a lista em tempo real via Supabase Realtime.
- Navbar e rodapé compartilhados nas páginas de produtos, planos, perfil e gamificação; login exibe somente o rodapé.
- Cadastro insere nome, e-mail e senha em `public.usuarios`; login consulta e-mail e senha nessa tabela, guarda apenas o ID em `localStorage` até o encerramento da sessão e direciona para `/perfil`, que carrega nome, telefone, e-mail, foto e trocas pelo ID. Leituras de sessão aceitam também IDs antigos em `sessionStorage`.
- Carrinho do catálogo armazena itens no navegador, abre como barra lateral e oferece contato direto com cada vendedor (nome, e-mail e telefone de `usuarios`) somente após login; login retorna ao carrinho e a sessão fica persistente até "Encerrar sessão" no perfil.
- Logo da navbar e link "Início" do rodapé navegam para `/`, a página inicial de produtos.
