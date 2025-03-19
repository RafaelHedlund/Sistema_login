// routes.js
const express = require("express");
const router = express.Router();

//rotas
router.post("/registro", async (req, res) => {
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

module.exports = router;
