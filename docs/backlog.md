# Concluído
- Catálogo carrega produtos ativos do Supabase com a categoria relacionada; mantém os dados de demonstração como fallback em caso de erro.
- Catálogo carrega filtros da tabela `categorias` e atualiza a lista em tempo real via Supabase Realtime.
- Navbar e rodapé compartilhados nas páginas de produtos, planos, perfil e gamificação; login exibe somente o rodapé.
- Cadastro insere nome, e-mail e senha em `public.usuarios`; login consulta e-mail e senha nessa tabela, guarda apenas o ID em `sessionStorage` e direciona para `/perfil`, que carrega nome, telefone, e-mail, foto e trocas pelo ID.
