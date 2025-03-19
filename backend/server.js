const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const SECRET_KEY = "segredo123"; // Substitua por uma chave mais segura
const app = express();

app.use(express.json());
app.use(cors());

// Conectar ao MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "sistema_login",
});

db.connect(err => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
        return;
    }
    console.log("Conectado ao MySQL!");
});

// Rota de registro
app.post("/registro", async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
    db.query(sql, [nome, email, senhaHash], (err) => {
        if (err) return res.status(500).json({ mensagem: "Erro ao registrar!" });

        res.json({ mensagem: "Registro bem-sucedido!" });
    });
});

// Rota de login
app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: "Email e senha são obrigatórios!" });
    }

    const sql = "SELECT * FROM usuarios WHERE email = ?";
    db.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).json({ mensagem: "Erro no servidor!" });

        if (result.length === 0) {
            return res.status(401).json({ mensagem: "Credenciais inválidas!" });
        }

        const usuario = result[0];

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Credenciais inválidas!" });
        }

        const token = jwt.sign({ id: usuario.id }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ mensagem: "Login bem-sucedido!", token });
    });
});

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) return res.status(401).json({ mensagem: "Acesso negado!" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ mensagem: "Token inválido!" });
    }
};

// Rota protegida para buscar o perfil do usuário
app.get("/perfil", authMiddleware, (req, res) => {
    const sql = "SELECT nome, email, imagem FROM usuarios WHERE id = ?";
    db.query(sql, [req.userId], (err, result) => {
        if (err) return res.status(500).json({ mensagem: "Erro ao buscar perfil!" });

        if (result.length === 0) {
            return res.status(404).json({ mensagem: "Usuário não encontrado!" });
        }

        res.json(result[0]);
    });
});

// Configurando o multer para armazenar as imagens na pasta uploads dentro do backend
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads')); // Define a pasta onde os arquivos serão salvos dentro da pasta backend
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage }); // <-- Isso cria a variável upload

// Criando um endpoint para upload de imagens
// Corrigindo o upload para aceitar o id
app.post("/upload/:id", upload.single("imagem"), (req, res) => {
    console.log("Imagem recebida:", req.file); // Verifique se a imagem está sendo recebida
    const userId = req.params.id;  // Acessa o id do usuário
    const imagePath = `/uploads/${req.file.filename}`;  // Caminho da imagem salva
    console.log("Caminho da imagem:", imagePath); // Verifique se o caminho está correto

    db.query("UPDATE usuarios SET imagem = ? WHERE id = ?", [imagePath, userId], (err, result) => {
        if (err) {
            console.error("Erro ao salvar imagem no banco:", err);
            return res.status(500).json({ message: "Erro ao salvar imagem" });
        }
        console.log("Imagem salva no banco de dados!");
        res.json({ message: "Imagem enviada com sucesso!", imagePath });
    });
});

// Criando um endpoint para buscar a imagem de um usuário
app.get("/imagem/:id", (req, res) => {
    const id = req.params.id;

    const sql = "SELECT imagem FROM usuarios WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Erro ao buscar imagem:", err);
            res.status(500).json({ message: "Erro ao buscar imagem" });
            return;
        }

        if (result.length === 0 || !result[0].imagem) {
            res.status(404).json({ message: "Imagem não encontrada" });
            return;
        }

        // A imagem é servida da pasta uploads dentro do backend
        res.sendFile(path.join(__dirname, result[0].imagem));
    });
});

// Servindo os arquivos da pasta uploads de forma acessível pela web
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Iniciando o servidor
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));


//rota api
const axios = require("axios");

app.post("/importar-produtos", authMiddleware, async (req, res) => {
    try {
        // Fazendo a requisição para a API fake
        const response = await axios.get("https://fakestoreapi.com/products");
        const produtos = response.data;
        
        // Aqui você vai salvar esses produtos no banco de dados
        produtos.forEach(produto => {
            const sql = "INSERT INTO produtos (nome, preco, descricao, imagem) VALUES (?, ?, ?, ?)";
            db.query(sql, [produto.title, produto.price, produto.description, produto.image], (err) => {
                if (err) {
                    console.error("Erro ao importar produto:", err);
                    return res.status(500).json({ mensagem: "Erro ao importar produto!" });
                }
            });
        });

        res.json({ mensagem: "Produtos importados com sucesso!" });
    } catch (error) {
        console.error("Erro ao chamar a API de produtos:", error);
        res.status(500).json({ mensagem: "Erro ao importar produtos!" });
    }
});


//rota para csv
const { Parser } = require('json2csv');

app.get("/exportar-produtos", authMiddleware, (req, res) => {
    const sql = "SELECT * FROM produtos";
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erro ao buscar produtos:", err);
            return res.status(500).json({ mensagem: "Erro ao buscar produtos!" });
        }

        const parser = new Parser();
        const csv = parser.parse(result);

        // Definindo o cabeçalho da resposta para download de CSV
        res.header('Content-Type', 'text/csv');
        res.attachment('produtos.csv');
        res.send(csv);
    });
});

//rota para importar produtos de um arquivo csv
const csv = require('csv-parser');
const fs = require('fs');

const uploadCSV = multer({ dest: 'uploads/' });

app.post("/importar-produtos-csv", authMiddleware, uploadCSV.single('arquivo'), (req, res) => {
    const filePath = path.join(__dirname, req.file.path);
    const produtos = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            produtos.push(row);
        })
        .on('end', () => {
            produtos.forEach(produto => {
                const sql = "INSERT INTO produtos (nome, preco, descricao, imagem) VALUES (?, ?, ?, ?)";
                db.query(sql, [produto.nome, produto.preco, produto.descricao, produto.imagem], (err) => {
                    if (err) {
                        console.error("Erro ao importar produto:", err);
                        return res.status(500).json({ mensagem: "Erro ao importar produto!" });
                    }
                });
            });

            res.json({ mensagem: "Produtos importados do CSV com sucesso!" });
        })
        .on('error', (err) => {
            console.error("Erro ao processar o arquivo CSV:", err);
            res.status(500).json({ mensagem: "Erro ao processar o arquivo CSV!" });
        });
});

