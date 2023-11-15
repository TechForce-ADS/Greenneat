import NavbarE from '../../Components/navbar/navbarParceiro.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function ExtratoE() {
  const [compras, setCompras] = useState([]);
  const [estabelecimento, setEstabelecimento] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Definindo quantos itens mostrar por página


  useEffect(() => {
    // Verificar se há um usuário logado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      window.location.href = 'http://localhost:3000/';
    }
  }, []);

  useEffect(() => {
    const email = localStorage.getItem('email');

    fetch(`http://localhost:3001/perfil/${email}`)
      .then(response => response.json())
      .then(data => {
        setEstabelecimento(data);
      })
      .catch(error => console.error('Erro ao obter dados do perfil:', error));
  }, []);

  useEffect(() => {
    if (estabelecimento && estabelecimento.id) {
      const EstabelecimentoId = estabelecimento.id;
      async function fetchData() {
        try {
          const response = await axios.get(`http://localhost:3001/historicoComprasParceiro?EstabelecimentoId=${EstabelecimentoId}`);
          setCompras(response.data);
        } catch (error) {
          console.error('Erro ao buscar as compras:', error);
        }
      }
      fetchData();
    }
  }, [estabelecimento]);

  if (compras.length === 0) {
    return <div>Carregando...</div>;
  }

  const formatarData = dataOriginal => {
    const data = new Date(dataOriginal);
    const ano = data.getFullYear();
    const mes = ('0' + (data.getMonth() + 1)).slice(-2);
    const dia = ('0' + data.getDate()).slice(-2);
    return `${dia}-${mes}-${ano}`;
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = currentPage * itemsPerPage;
  const currentItems = compras.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <NavbarE activeLink="/Compras" />
      <div style={{ marginTop: '20px', textAlign: 'center' }}> {/* Espaço na margem superior e centralização */}
        <table style={{ margin: '0 auto', width: '80%' }}> {/* Centralizar a tabela e definir largura */}
          <thead>
            <tr>
              <th>Produtos</th>
              <th>Data da Transação</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(compra => (
              <tr key={compra.id}>
                <td>
                  {compra.produtos.map((produto, index) => (
                    <div key={index}>
                      <p>Produto: {produto.productName}</p>
                      {produto.price ? <p>Preço: ${produto.price.toFixed(2)}</p> : null}
                      <p>Quantidade: {produto.quantity}</p>
                      <p>_________________</p>
                    </div>
                  ))}
                </td>
                <td>{formatarData(compra.createdAt)}</td>
                <td>
                  {compra.total !== undefined && compra.total !== null
                    ? `$${compra.total.toFixed(2)}`
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '20px' }}>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 0}>
            Anterior
          </button>
          <span style={{ margin: '0 20px' }}>Página {currentPage + 1}</span>
          <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= compras.length}>
            Próximo
          </button>
        </div>
      </div>
    </>
  )
};

export default ExtratoE;
