// Função para carregar os clientes
function carregarClientes() {
  fetch('http://localhost:3000/clientes')
    .then(response => response.json())
    .then(data => {
      const tabela = document.getElementById('clientes-table').querySelector('tbody');
      tabela.innerHTML = '';
      data.forEach(cliente => {
        const linha = document.createElement('tr');
        linha.innerHTML = `<td>${cliente.id}</td><td>${cliente.nome}</td><td>${cliente.email}</td>`;
        tabela.appendChild(linha);
      });
    })
    .catch(error => console.error('Erro ao carregar clientes:', error));
}

// Função para carregar os produtos
function carregarProdutos() {
  fetch('http://localhost:3000/produtos')
    .then(response => response.json())
    .then(data => {
      const tabela = document.getElementById('produtos-table').querySelector('tbody');
      tabela.innerHTML = '';
      data.forEach(produto => {
        const linha = document.createElement('tr');
        linha.innerHTML = `<td>${produto.id}</td><td>${produto.nome}</td><td>${produto.preco}</td>`;
        tabela.appendChild(linha);
      });
    })
    .catch(error => console.error('Erro ao carregar produtos:', error));
}

// Função para carregar as vendas
function carregarVendas() {
  fetch('http://localhost:3000/vendas')
    .then(response => response.json())
    .then(data => {
      const tabela = document.getElementById('vendas-table').querySelector('tbody');
      tabela.innerHTML = '';
      data.forEach(venda => {
        const linha = document.createElement('tr');
        linha.innerHTML = `<td>${venda.id}</td><td>${venda.clienteId}</td><td>${venda.produtoId}</td><td>${venda.quantidade}</td>`;
        tabela.appendChild(linha);
      });
    })
    .catch(error => console.error('Erro ao carregar vendas:', error));
}

// Carregar dados quando a página for carregada
window.onload = function() {
  carregarClientes();
  carregarProdutos();
  carregarVendas();
}
