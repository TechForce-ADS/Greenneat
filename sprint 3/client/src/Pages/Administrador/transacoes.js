import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/navbar/navbarAdministrador';

function Transacoes() {
  const [transacoes, setTransacoes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  const formatarData = (dataOriginal) => {
    const data = new Date(dataOriginal);
    const ano = data.getFullYear();
    const mes = ('0' + (data.getMonth() + 1)).slice(-2);
    const dia = ('0' + data.getDate()).slice(-2);
    return `${dia}-${mes}-${ano}`;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3001/TodosasComprasCredito`);
        console.log('Response from backend:', response.data);
        setTransacoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar as transacoes:', error);
      }
    }

    fetchData();
  }, []);



  useEffect(() => {
    // Verificar se há um usuário logado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const adm = localStorage.getItem('adm');
    
    if (isLoggedIn || adm) {
      window.location.href = 'http://localhost:3000/';
    }
  }, []);
  


  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transacoes.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(transacoes.length / transactionsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <Navbar activeLink="/transacoesADM" />

      <div className="container">
        <table style={{ width: '70%' }}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transacao) => (
              <tr key={transacao.id}>
                <td>{transacao.nomeOrganizacao}</td>
                <td>{transacao.valor} Créditos</td>
                <td>{formatarData(transacao.data)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Controles de páginação */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Anterior
          </button>
          <span style={{ margin: '0 20px' }}>Página {currentPage}</span>
          <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastTransaction >= transacoes.length}>
            Próximo
          </button>
        </div>
      </div>
    </>
  );
}

export default Transacoes;
