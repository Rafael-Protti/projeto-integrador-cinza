// Cadastro.js - Lógica interativa para a página de Cadastro/Perfil

document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DO DOM ---
    const formPerfil = document.getElementById('form-perfil');
    const inputNome = document.getElementById('input-nome');
    const inputTelefone = document.getElementById('input-telefone');
    const inputEmail = document.getElementById('input-email');
    const inputTrocas = document.getElementById('input-trocas');
    const spanTrocas = document.getElementById('span-trocas-contador');
    const btnSalvar = document.getElementById('btn-salvar-alteracoes');
    const msgFeedback = document.getElementById('msg-feedback');

    // Elementos de Imagem
    const inputFoto = document.getElementById('input-foto-file');
    const btnTrocarFoto = document.getElementById('btn-trocar-foto');
    const imgUsuario = document.getElementById('img-usuario-preview');
    const modalCorte = document.getElementById('modal-corte');
    const imgModalPreview = document.getElementById('img-modal-preview');
    const btnConfirmarCorte = document.getElementById('btn-confirmar-corte');
    const btnCancelarCorte = document.getElementById('btn-cancelar-corte');

    // Elementos de Coleção e Pesquisa
    const inputPesquisa = document.getElementById('input-pesquisa');
    const cardsColecoes = document.querySelectorAll('.card-colecao');
    const btnIncrementarTroca = document.getElementById('btn-incrementar-troca');

    // --- ESTADO INICIAL DOS CAMPOS ---
    const estadoInicial = {
        nome: inputNome ? inputNome.value.trim() : '',
        telefone: inputTelefone ? inputTelefone.value.trim() : '',
        email: inputEmail ? inputEmail.value.trim() : ''
    };

    let imagemTempDataUrl = null;

    // --- 1. MÁSCARA DE TELEFONE (11) 99999-9999 ---
    if (inputTelefone) {
        inputTelefone.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Remove não dígitos
            if (value.length > 11) value = value.slice(0, 11);

            if (value.length > 6) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            } else if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }

            e.target.value = value;
            verificarModificacoes();
        });
    }

    // --- 2. VALIDAÇÃO DE NOME (Somente letras e sobrenome obrigatório) ---
    function validarNome(nome) {
        const regexApenasLetras = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
        const partes = nome.trim().split(/\s+/);
        
        if (!regexApenasLetras.test(nome.trim())) {
            return { valido: false, msg: 'O nome deve conter apenas letras.' };
        }
        if (partes.length < 2 || partes[1].length === 0) {
            return { valido: false, msg: 'Informe nome e sobrenome.' };
        }
        return { valido: true, msg: '' };
    }

    // --- 3. VALIDAÇÃO DE EMAIL ---
    function validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email.trim())) {
            return { valido: false, msg: 'Insira um e-mail válido com @ e domínio.' };
        }
        return { valido: true, msg: '' };
    }

    // --- 4. EXIBIÇÃO DO BOTÃO "SALVAR ALTERAÇÕES" ---
    function verificarModificacoes() {
        if (!btnSalvar) return;
        const nomeAtual = inputNome ? inputNome.value.trim() : '';
        const telefoneAtual = inputTelefone ? inputTelefone.value.trim() : '';
        const emailAtual = inputEmail ? inputEmail.value.trim() : '';

        const modificado = (
            nomeAtual !== estadoInicial.nome ||
            telefoneAtual !== estadoInicial.telefone ||
            emailAtual !== estadoInicial.email ||
            imagemTempDataUrl !== null
        );

        if (modificado) {
            btnSalvar.classList.remove('oculto');
            btnSalvar.disabled = false;
        } else {
            btnSalvar.classList.add('oculto');
            btnSalvar.disabled = true;
        }
    }

    if (inputNome) inputNome.addEventListener('input', verificarModificacoes);
    if (inputEmail) inputEmail.addEventListener('input', verificarModificacoes);

    // --- 5. UPLOAD DE FOTO DE PERFIL (Restrição .jpg/.png e até 2MB + Modal Corte) ---
    if (btnTrocarFoto && inputFoto) {
        btnTrocarFoto.addEventListener('click', () => {
            inputFoto.click();
        });

        inputFoto.addEventListener('change', (e) => {
            const arquivo = e.target.files[0];
            if (!arquivo) return;

            // Validação de tipo de arquivo (.jpg, .jpeg, .png)
            const tiposValidos = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!tiposValidos.includes(arquivo.type.toLowerCase())) {
                mostrarMensagem('Erro: Apenas formatos JPG e PNG são permitidos.', 'erro');
                inputFoto.value = '';
                return;
            }

            // Validação de tamanho (máximo 2MB = 2 * 1024 * 1024 bytes)
            const maxTamanhoBytes = 2 * 1024 * 1024;
            if (arquivo.size > maxTamanhoBytes) {
                mostrarMensagem('Erro: O arquivo deve ter no máximo 2MB.', 'erro');
                inputFoto.value = '';
                return;
            }

            // Leitura do arquivo para pré-visualização no modal
            const reader = new FileReader();
            reader.onload = (event) => {
                imgModalPreview.src = event.target.result;
                modalCorte.classList.add('ativo');
            };
            reader.readAsDataURL(arquivo);
        });
    }

    if (btnConfirmarCorte) {
        btnConfirmarCorte.addEventListener('click', () => {
            if (imgModalPreview.src) {
                imgUsuario.src = imgModalPreview.src;
                imagemTempDataUrl = imgModalPreview.src;
                modalCorte.classList.remove('ativo');
                mostrarMensagem('Foto atualizada com sucesso! Clique em "Salvar alterações".', 'sucesso');
                verificarModificacoes();
            }
        });
    }

    if (btnCancelarCorte) {
        btnCancelarCorte.addEventListener('click', () => {
            modalCorte.classList.remove('ativo');
            inputFoto.value = '';
        });
    }

    // --- 6. SUBMISSÃO DO FORMULÁRIO / SALVAR ALTERAÇÕES ---
    if (formPerfil) {
        formPerfil.addEventListener('submit', (e) => {
            e.preventDefault();

            const nomeRes = validarNome(inputNome.value);
            if (!nomeRes.valido) {
                mostrarMensagem(nomeRes.msg, 'erro');
                inputNome.focus();
                return;
            }

            const emailRes = validarEmail(inputEmail.value);
            if (!emailRes.valido) {
                mostrarMensagem(emailRes.msg, 'erro');
                inputEmail.focus();
                return;
            }

            // Atualiza estado inicial
            estadoInicial.nome = inputNome.value.trim();
            estadoInicial.telefone = inputTelefone.value.trim();
            estadoInicial.email = inputEmail.value.trim();
            imagemTempDataUrl = null;

            verificarModificacoes();
            mostrarMensagem('Alterações salvas com sucesso!', 'sucesso');
        });
    }

    // --- 7. INCREMENTO DO NÚMERO DE TROCAS ---
    if (btnIncrementarTroca && spanTrocas) {
        btnIncrementarTroca.addEventListener('click', () => {
            let totalAtual = parseInt(spanTrocas.textContent, 10) || 0;
            totalAtual += 1;
            spanTrocas.textContent = totalAtual;
            if (inputTrocas) inputTrocas.value = totalAtual;
            mostrarMensagem('+1 Ponto de troca adicionado com sucesso!', 'sucesso');
        });
    }

    // --- 8. PESQUISA EM TEMPO REAL ---
    if (inputPesquisa) {
        inputPesquisa.addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase().trim();
            cardsColecoes.forEach(card => {
                const titulo = card.querySelector('.nome-colecao')?.textContent.toLowerCase() || '';
                const desc = card.querySelector('.qtd-itens')?.textContent.toLowerCase() || '';
                if (titulo.includes(termo) || desc.includes(termo)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // --- 9. BOTÕES "VER COLEÇÃO" REDIRECIONANDO PARA PRODUTOS.HTML ---
    const btnsVerColecao = document.querySelectorAll('.btn-ver-colecao');
    btnsVerColecao.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const categoria = e.target.getAttribute('data-categoria') || 'geral';
            window.location.href = `produtos.html?categoria=${encodeURIComponent(categoria)}`;
        });
    });

    // --- FUNÇÃO AUXILIAR DE MENSAGENS ---
    function mostrarMensagem(texto, tipo) {
        if (!msgFeedback) return;
        msgFeedback.textContent = texto;
        msgFeedback.className = `msg-feedback ${tipo}`;
        msgFeedback.style.display = 'block';

        setTimeout(() => {
            msgFeedback.style.display = 'none';
        }, 4000);
    }
});
