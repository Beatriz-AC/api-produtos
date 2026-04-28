const express = require('express');
const app = express();

//rota raiz
app.get('/', (req, res) => {
    res.send('Teste da rota raiz');
});

//rota
app.get('/about', (req, res) => {
    res.send('Teste da rota about');
});

//rota '/contact' que responde com uma informação de contato
app.get('/contact', (req, res) => {
    res.send('contato do suporte = suporte@exemplo')
});

//iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

