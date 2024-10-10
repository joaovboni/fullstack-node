const apiUrl = 'http://localhost:3000/clientes';

// Função para listar todos os clientes
function listarClientes() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let output = '<ul>';
            data.forEach(cliente => {
                output += `<li>ID: ${cliente.id} - Nome: ${cliente.nome} - Email: ${cliente.email} 
                            <button onclick="editarCliente(${cliente.id}, '${cliente.nome}', '${cliente.email}')">Editar</button></li>`;
            });
            output += '</ul>';
            document.getElementById('clientesList').innerHTML = output;
        })
        .catch(error => console.log('Erro ao listar clientes:', error));
}

// Função para adicionar ou editar um cliente
document.getElementById('clienteForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const cliente = { nome, email };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    })
    .then(response => response.json())
    .then(data => {
        listarClientes();
        alert('Cliente salvo com sucesso!');
        this.reset(); // Reseta o formulário
    })
    .catch(error => console.log('Erro ao salvar cliente:', error));
});

// Função para editar um cliente
function editarCliente(id, nome, email) {
    document.getElementById('id').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('email').value = email;
}

// Função para excluir cliente
function excluirCliente() {
    const id = document.getElementById('deleteId').value;
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(() => {
            listarClientes();
            alert('Cliente excluído com sucesso!');
        })
        .catch(error => console.log('Erro ao excluir cliente:', error));
}
