import NavbarE from '../../Components/navbar/navbarEstabelecimento.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExtratoE() {
  const [compras, setCompras] = useState([]);
  const [estabelecimento, setEstabelecimento] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Verificar se há um usuário logado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      window.location.href = 'http://localhost:3000/';
    }
  }, []);

  useEffect(() => {
    const email = localStorage.getItem("email");

    fetch(`http://localhost:3001/perfil/${email}`)
      .then(response => response.json())
      .then(data => {
        setEstabelecimento(data);
      })
      .catch(error => console.error("Erro ao obter dados do perfil:", error));
  }, []);

  useEffect(() => {
    if (estabelecimento && estabelecimento.id) {
      const estabelecimentoId = estabelecimento.id;
      async function fetchData() {
        try {
          const response = await axios.get(`http://localhost:3001/historicoCompras?estabelecimentoId=${estabelecimentoId}`);
          console.log('Response from backend:', response.data); // Adicionado para debug
          setCompras(response.data);
        } catch (error) {
          console.error('Erro ao buscar as compras:', error);
        }
      }
      fetchData();
    }
  }, [estabelecimento]);

  const itemsPerPage = 5;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = compras.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(compras.length / itemsPerPage);

  const formatarData = (dataOriginal) => {
    const data = new Date(dataOriginal);
    const ano = data.getFullYear();
    const mes = ('0' + (data.getMonth() + 1)).slice(-2);
    const dia = ('0' + data.getDate()).slice(-2);
    return `${dia}-${mes}-${ano}`;
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  if (compras.length === 0) {
    return (
      <>
    <NavbarE activeLink="/extratoE" />
    <div>Nenhuma compra encotrada...</div>;
    </>
    )
  }

  return (
    <>
      <NavbarE activeLink="/extratoE" />
      <table>
        <thead>
          <tr>
            <th>Produtos</th>
            <th>Data da Transação</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((compra) => (
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
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
        <span style={{ margin: '0 10px' }}>Página {currentPage} de {totalPages}</span>
        <button onClick={nextPage} disabled={currentItems.length < itemsPerPage}>Próximo</button>
      </div>
    </>
  );
}

export default ExtratoE;
