const ProdutoModel = require('../models/produtoModel');

function listarTodos(req, res) {
try {

const produtos = ProdutoModel.listarTodos();

res.status(200).json(produtos);
} catch (erro) {

res.status(500).json({
mensagem: 'Erro ao listar produtos',
erro: erro.message
});
}
}

function buscarPorId(req, res) {
try {

const id = parseInt(req.params.id);

if (isNaN(id)) {
return res.status(400).json({
mensagem: 'ID inválido - deve ser um número'
});
}

const produto = ProdutoModel.buscarPorId(id);

if (produto) {
res.status(200).json(produto);
} else {
res.status(404).json({
mensagem: `Produto com ID ${id} não encontrado`
});
}
} catch (erro) {
res.status(500).json({
mensagem: 'Erro ao buscar produto',
erro: erro.message
});
}
}

function criar(req, res) {
try {

const { nome, preco, estoque, categoria } = req.body;

if (!nome || !preco || !estoque || !categoria) {
return res.status(400).json({
mensagem: 'Todos os campos são obrigatórios: nome, preco, estoque,categoria'
});
}

if (parseFloat(preco) <= 0) {
return res.status(400).json({
mensagem: 'O preço deve ser maior que zero'
});
}

if (parseInt(estoque) < 0) {
return res.status(400).json({
mensagem: 'O estoque não pode ser negativo'
});
}

const novoProduto = ProdutoModel.criar({
nome,
preco,
estoque,
categoria
});

res.status(201).json(novoProduto);
} catch (erro) {
    res.status(500).json({
mensagem: 'Erro ao criar produto',
erro: erro.message
});
}
}

function atualizar(req, res) {
try {
// Capturar o ID da URL
const id = parseInt(req.params.id);
// Capturar os dados do body
const { nome, preco, estoque, categoria } = req.body;
// VALIDAÇÃO: ID deve ser válido
if (isNaN(id)) {
return res.status(400).json({
mensagem: 'ID inválido'
});
}

if (!nome || !preco || !estoque || !categoria) {
return res.status(400).json({
mensagem: 'Todos os campos são obrigatórios para atualização completa'
});
}
// VALIDAÇÃO: regras de negócio
if (parseFloat(preco) <= 0) {
return res.status(400).json({
mensagem: 'O preço deve ser maior que zero'
});
}
if (parseInt(estoque) < 0) {
return res.status(400).json({
mensagem: 'O estoque não pode ser negativo'
});
}

const produtoAtualizado = ProdutoModel.atualizar(id, {
nome,
preco,
estoque,
categoria
});

if (produtoAtualizado) {
res.status(200).json(produtoAtualizado);
} else {
res.status(404).json({
mensagem: `Produto com ID ${id} não encontrado`
});
}
} catch (erro) {
res.status(500).json({
mensagem: 'Erro ao atualizar produto',
erro: erro.message
});
}
}

function deletar(req, res) {
try {
// Capturar o ID da URL
const id = parseInt(req.params.id);
// VALIDAÇÃO: ID deve ser válido
if (isNaN(id)) {
return res.status(400).json({
mensagem: 'ID inválido'
});
}
// Deletar usando a função do Model
const deletado = ProdutoModel.deletar(id);
// Verificar se conseguiu deletar
if (deletado) {
res.status(200).json({
mensagem: `Produto com ID ${id} removido com sucesso`
});
} else {
res.status(404).json({
mensagem: `Produto com ID ${id} não encontrado`
});
}
} catch (erro) {
res.status(500).json({
mensagem: 'Erro ao deletar produto',
erro: erro.message
});
}
}

function buscarPorNome(req, res) {
try {

const { nome } = req.params;

const produtos = ProdutoModel.buscarPorNome(nome);

res.status(200).json(produtos);
} catch (erro) {
res.status(500).json({
mensagem: 'Erro ao buscar produtos por nome',
erro: erro.message
});
}
}

module.exports = {
listarTodos,
buscarPorId,
criar,
atualizar,
deletar,
buscarPorNome
};