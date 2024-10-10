const apiUrl = 'http://localhost:3000/produtos';

// Função para listar todos os produtos
function listarProdutos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let output = '<h2>Lista de Produtos</h2><ul>';
            data.forEach(produto => {
                output += `<li>ID: ${produto.id} - Nome: ${produto.nome} - Preço: R$${produto.preco.toFixed(2)} 
                            <button onclick="editarProduto(${produto.id}, '${produto.nome}', ${produto.preco})">Editar</button></li>`;
            });
            output += '</ul>';
            document.getElementById('produtosList').innerHTML = output;
        })
        .catch(error => console.log('Erro ao listar produtos:', error));
}

// Função para adicionar ou editar um produto
document.getElementById('produtoForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value); // Converta para float

    if (!nome || isNaN(preco)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const produto = { nome, preco };
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao salvar produto.');
        }
        return response.json();
    })
    .then(data => {
        alert('Produto salvo com sucesso!');
        listarProdutos(); // Atualiza a lista de produtos
        this.reset(); // Limpa o formulário
    })
    .catch(error => console.log('Erro ao salvar produto:', error));
});

// Função para editar um produto (preenche o formulário)
function editarProduto(id, nome, preco) {
    document.getElementById('id').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('preco').value = preco;
}

// Função para excluir produto
function excluirProduto() {
    const id = document.getElementById('deleteId').value;
    if (!id) {
        alert('Por favor, insira o ID do produto que deseja excluir.');
        return;
    }
    
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao excluir produto.');
            }
            return response.json();
        })
        .then(() => {
            listarProdutos();
            alert('Produto excluído com sucesso!');
        })
        .catch(error => console.log('Erro ao excluir produto:', error));
}

// Carregar a lista de produtos ao iniciar
window.onload = listarProdutos;
