const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const dataFilePath = path.join(__dirname, 'data', 'database.json');

app.use(cors());
app.use(express.json());

// Função para ler os dados
function readData() {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
}

// Função para escrever os dados
function writeData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Rota para obter clientes
app.get('/clientes', (req, res) => {
    const data = readData();
    res.json(data.clientes);
});

// Rota para adicionar um cliente
app.post('/clientes', (req, res) => {
    const data = readData();
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ message: 'Nome e email são obrigatórios' });
    }

    const id = data.clientes.length ? data.clientes[data.clientes.length - 1].id + 1 : 1;
    const novoCliente = { id, nome, email };
    data.clientes.push(novoCliente);
    writeData(data);
    res.json(novoCliente);
});

// Rota para excluir um cliente
app.delete('/clientes/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const index = data.clientes.findIndex(c => c.id === id);

    if (index !== -1) {
        data.clientes.splice(index, 1); // Remove o cliente do array
        writeData(data); // Escreve os dados atualizados no arquivo
        res.status(204).send(); // Retorna status 204 No Content
    } else {
        res.status(404).json({ message: 'Cliente não encontrado' }); // Retorna erro se não encontrar o cliente
    }
});

// Rotas para produtos
app.get('/produtos', (req, res) => {
    const data = readData();
    res.json(data.produtos);
});

app.post('/produtos', (req, res) => {
    const data = readData();
    const { nome, preco } = req.body;

    if (!nome || preco === undefined) {
        return res.status(400).json({ message: 'Nome e preço são obrigatórios' });
    }

    const id = data.produtos.length ? data.produtos[data.produtos.length - 1].id + 1 : 1;
    const novoProduto = { id, nome, preco };
    data.produtos.push(novoProduto);
    writeData(data);
    res.json(novoProduto);
});

// Rota para excluir um produto
app.delete('/produtos/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const index = data.produtos.findIndex(p => p.id === id);

    if (index !== -1) {
        data.produtos.splice(index, 1);
        writeData(data);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

// Rotas para vendas
app.get('/vendas', (req, res) => {
    const data = readData();
    res.json(data.vendas);
});

app.post('/vendas', (req, res) => {
    const data = readData();
    const { clienteId, produtoId, quantidade } = req.body;

    if (!clienteId || !produtoId || !quantidade) {
        return res.status(400).json({ message: 'Cliente, produto e quantidade são obrigatórios' });
    }

    const id = data.vendas.length ? data.vendas[data.vendas.length - 1].id + 1 : 1;
    const novaVenda = { id, clienteId, produtoId, quantidade };
    data.vendas.push(novaVenda);
    writeData(data);
    res.json(novaVenda);
});

// Rota para excluir uma venda
app.delete('/vendas/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const index = data.vendas.findIndex(v => v.id === id);

    if (index !== -1) {
        data.vendas.splice(index, 1);
        writeData(data);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Venda não encontrada' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
