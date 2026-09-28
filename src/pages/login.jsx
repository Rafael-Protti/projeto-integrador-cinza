CREATE DATABASE galeria_atemporal;

USE galeria_atemporal;

-- ==========================================
-- TABELA DE USUÁRIOS
-- ==========================================

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    foto VARCHAR(255),
    numero_trocas INT DEFAULT 0,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- TABELA DE CATEGORIAS
-- ==========================================

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);


-- ==========================================
-- TABELA DE PRODUTOS
-- ==========================================

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    imagem VARCHAR(255),
    usuario_id INT,
    categoria_id INT,

    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),

    FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
);


-- ==========================================
-- TABELA DE TROCAS
-- ==========================================

CREATE TABLE trocas (
    id INT AUTO_INCREMENT PRIMARY KEY,

    usuario_id INT NOT NULL,

    produto_oferecido_id INT,
    produto_recebido_id INT,

    data_troca TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),

    FOREIGN KEY (produto_oferecido_id)
        REFERENCES produtos(id),

    FOREIGN KEY (produto_recebido_id)
        REFERENCES produtos(id)
);


-- ==========================================
-- CATEGORIAS INICIAIS
-- ==========================================

INSERT INTO categorias (nome)
VALUES
('Discos de Vinil'),
('Livros'),
('Cartinhas'),
('Jogos');

npm init -y
npm install express mysql2 cors dotenv
const mysql = require("mysql2");

const banco = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "SUA_SENHA",
    database: "galeria_atemporal"
});

banco.connect((erro) => {

    if (erro) {
        console.log("Erro ao conectar ao banco:", erro);
        return;
    }

    console.log("Banco de dados conectado!");
});

module.exports = banco;

password: "SUA_SENHA"
const express = require("express");
const cors = require("cors");

const banco = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


// ==========================================
// TESTE DO SERVIDOR
// ==========================================

app.get("/", (req, res) => {

    res.json({
        mensagem: "API da Galeria Atemporal funcionando!"
    });

});


// ==========================================
// CADASTRAR USUÁRIO
// ==========================================

app.post("/usuarios", (req, res) => {

    const {
        nome,
        telefone,
        email,
        senha
    } = req.body;

    const sql = `
        INSERT INTO usuarios
        (nome, telefone, email, senha)
        VALUES (?, ?, ?, ?)
    `;

    banco.query(
        sql,
        [nome, telefone, email, senha],
        (erro, resultado) => {

            if (erro) {

                console.log(erro);

                return res.status(500).json({
                    erro: "Erro ao cadastrar usuário"
                });

            }

            res.json({
                mensagem: "Usuário cadastrado com sucesso!",
                id: resultado.insertId
            });

        }
    );

});


// ==========================================
// BUSCAR USUÁRIOS
// ==========================================

app.get("/usuarios", (req, res) => {

    const sql = "SELECT * FROM usuarios";

    banco.query(sql, (erro, resultados) => {

        if (erro) {

            return res.status(500).json({
                erro: "Erro ao buscar usuários"
            });

        }

        res.json(resultados);

    });

});


app.listen(3001, () => {

    console.log(
        "Servidor funcionando em http://localhost:3001"
    );

});

node server.js
const handleCadastroSubmit = (e) => {
    e.preventDefault();

    console.log('Cadastro:', {
        email: cadastroEmail,
        senha: cadastroSenha
    });
};
const handleCadastroSubmit = async (e) => {

    e.preventDefault();

    try {

        const resposta = await fetch(
            "http://localhost:3001/usuarios",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    nome: "Novo Usuário",
                    email: cadastroEmail,
                    senha: cadastroSenha
                })
            }
        );

        const dados = await resposta.json();

        console.log(dados);

        alert("Conta criada com sucesso!");

    } catch (erro) {

        console.error(erro);

        alert("Erro ao cadastrar!");

    }

};
import './Login.css';
SELECT *
FROM usuarios
WHERE email = ?
AND senha = ?;
app.post("/login", (req, res) => {

    const { email, senha } = req.body;

    const sql = `
        SELECT id, nome, email
        FROM usuarios
        WHERE email = ?
        AND senha = ?
    `;

    banco.query(
        sql,
        [email, senha],
        (erro, resultados) => {

            if (erro) {

                return res.status(500).json({
                    erro: "Erro no login"
                });

            }

            if (resultados.length === 0) {

                return res.status(401).json({
                    erro: "Email ou senha incorretos"
                });

            }

            res.json({
                mensagem: "Login realizado!",
                usuario: resultados[0]
            });

        }
    );

});
const handleLoginSubmit = async (e) => {

    e.preventDefault();

    const resposta = await fetch(
        "http://localhost:3001/login",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: loginEmail,
                senha: loginSenha
            })
        }
    );

    const dados = await resposta.json();

    if (!resposta.ok) {

        alert(dados.erro);
    }

    alert("Login realizado com sucesso!");

    console.log(dados.usuario);

};
        return;
SELECT
    categorias.id,
    categorias.nome,
    COUNT(produtos.id) AS quantidade
FROM categorias

LEFT JOIN produtos
ON produtos.categoria_id = categorias.id

GROUP BY categorias.id;
[
    {
        id: 1,
        nome: "Discos de Vinil",
        quantidade: 12
    },

    {
        id: 2,
        nome: "Livros",
        quantidade: 20
    },

    {
        id: 3,
        nome: "Cartinhas",
        quantidade: 36
    },

    {
        id: 4,
        nome: "Jogos",
        quantidade: 9
    }
]
UPDATE usuarios
SET numero_trocas = numero_trocas + 1
WHERE id = 1;

