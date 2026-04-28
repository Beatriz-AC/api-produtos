const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.static('public'))

app.use(express.json());

const produtoRoutes = require('./src/routes/produtoRoutes');

app.use('/produtos', produtoRoutes);

app.listen(PORT, () => {
console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
console.log(`📦 API MVC implementada com sucesso!`);
});