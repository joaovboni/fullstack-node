const apiUrl = 'http://localhost:3000/vendas';

// Função para listar todas as vendas
function listarVendas() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let output = '<h2>Lista de Vendas</h2><ul>';
            data.forEach(venda => {
                output += `<li>ID: ${venda.id} - Cliente ID: ${venda.clienteId} - Produto ID: ${venda.produtoId} - Quantidade: ${venda.quantidade}
                            <button onclick="editarVenda(${venda.id}, ${venda.clienteId}, ${venda.produtoId}, ${venda.quantidade})">Editar</button></li>`;
            });
            output += '</ul>';
            document.getElementById('vendasList').innerHTML = output;
        })
        .catch(error => console.log('Erro ao listar vendas:', error));
}

// Função para adicionar ou editar uma venda
document.getElementById('vendaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const clienteId = document.getElementById('clienteId').value;
    const produtoId = document.getElementById('produtoId').value;
    const quantidade = document.getElementById('quantidade').value;

    const venda = { clienteId, produtoId, quantidade };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(venda)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao salvar venda.');
        return response.json();
    })
    .then(data => {
        alert('Venda salva com sucesso!');
        listarVendas();
        this.reset(); // Limpa o formulário
    })
    .catch(error => console.log('Erro ao salvar venda:', error));
});

// Função para editar uma venda (preenche o formulário)
function editarVenda(id, clienteId, produtoId, quantidade) {
    document.getElementById('id').value = id;
    document.getElementById('clienteId').value = clienteId;
    document.getElementById('produtoId').value = produtoId;
    document.getElementById('quantidade').value = quantidade;
}

// Função para excluir uma venda
function excluirVenda() {
    const id = document.getElementById('deleteId').value;
    if (!id) {
        alert('Por favor, insira o ID da venda que deseja excluir.');
        return;
    }
    
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao excluir venda.');
            return response.json();
        })
        .then(() => {
            listarVendas();
            alert('Venda excluída com sucesso!');
        })
        .catch(error => console.log('Erro ao excluir venda:', error));
}

// Carregar a lista de vendas ao iniciar
window.onload = listarVendas;
