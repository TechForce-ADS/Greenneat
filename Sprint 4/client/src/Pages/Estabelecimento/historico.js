import NavbarE from '../../Components/navbar/navbarEstabelecimento.js';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HistoricoE() {
  const [coletas, setColetas] = useState([]);
  const [estabelecimento, setEstabelecimento] = useState(null);
  const [orderByOil, setOrderByOil] = useState('desc');
  const [orderByCredits, setOrderByCredits] = useState('desc');
  const [orderByPartner, setOrderByPartner] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);


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
        console.log('Dados do perfil:', data);
        setEstabelecimento(data);
      })
      .catch(error => console.error('Erro ao obter dados do perfil:', error));
  }, []);

  useEffect(() => {
    if (estabelecimento && estabelecimento.id) {
      const EstabelecimentoId = estabelecimento.id;
      async function fetchData() {
        try {
          const response = await axios.get(`http://localhost:3001/historicoEstabelecimento?EstabelecimentoId=${EstabelecimentoId}`);
          setColetas(response.data);
        } catch (error) {
          console.error('Erro ao buscar as transações:', error);
        }
      }
      fetchData();
    }
  }, [estabelecimento]);

  const sortListByOil = () => {
    const sortedList = [...coletas];
    sortedList.sort((a, b) => {
      if (orderByOil === 'asc') {
        return b.quantidade - a.quantidade;
      } else {
        return a.quantidade - b.quantidade;
      }
    });
    setColetas(sortedList);
    setOrderByOil(orderByOil === 'asc' ? 'desc' : 'asc');
    setOrderByCredits(orderByOil === 'asc' ? 'desc' : 'asc');
    setOrderByPartner('asc');
  };

  const sortListByCredits = () => {
    const sortedList = [...coletas];
    sortedList.sort((a, b) => {
      if (orderByCredits === 'asc') {
        return b.quantidade * 10 - a.quantidade * 10;
      } else {
        return a.quantidade * 10 - b.quantidade * 10;
      }
    });
    setColetas(sortedList);
    setOrderByCredits(orderByCredits === 'asc' ? 'desc' : 'asc');
    setOrderByOil(orderByCredits === 'asc' ? 'desc' : 'asc');
    setOrderByPartner('asc');
  };

  const sortListByPartner = () => {
    const sortedList = [...coletas];
    sortedList.sort((a, b) => {
      if (orderByPartner === 'asc') {
        return a.Parceiro.nomeOrganizacao.localeCompare(b.Parceiro.nomeOrganizacao);
      } else {
        return b.Parceiro.nomeOrganizacao.localeCompare(a.Parceiro.nomeOrganizacao);
      }
    });
    setColetas(sortedList);
    setOrderByPartner(orderByPartner === 'asc' ? 'desc' : 'asc');
    setOrderByOil('desc');
    setOrderByCredits('desc');
  };

  const formatarData = (dataOriginal) => {
    const data = new Date(dataOriginal);
    const ano = data.getFullYear();
    const mes = ('0' + (data.getMonth() + 1)).slice(-2);
    const dia = ('0' + data.getDate()).slice(-2);
    return `${dia}-${mes}-${ano}`;
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(coletas.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentColetas = coletas.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <NavbarE activeLink="/historicoE" />
      <div>
        <table>
          <thead>
            <tr>
              <th>
                <button className='organizacao' onClick={sortListByOil}>
                  Óleo cedido (L) {orderByOil === 'asc' ? 'Crescente' : 'Decrescente'}
                </button>
              </th>
              <th>
                <button className='organizacao' onClick={sortListByCredits}>
                  Créditos recebidos {orderByCredits === 'asc' ? 'Crescente' : 'Decrescente'}
                </button>
              </th>
              <th>
                <button onClick={sortListByPartner}>
                  Parceiro {orderByPartner === 'asc' ? 'Z-A' : 'A-Z'}
                </button>
              </th>
              <th>Tipo</th>
              <th>Data da Transação</th>
            </tr>
          </thead>
          <tbody>
            {currentColetas.map((coleta) => (
              <tr key={coleta.id}>
                <td>{coleta.quantidade}</td>
                <td>{coleta.credito}</td>
                <td>{coleta.Parceiro ? coleta.Parceiro.nomeOrganizacao : 'Parceiro Deletado'}</td>
                <td>{coleta.tipo}</td>
                <td>{formatarData(coleta.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button onClick={prevPage} disabled={currentPage === 1}>Página Anterior</button>
          <span style={{ margin: '0 10px' }}>Página {currentPage}</span>
          <button onClick={nextPage} disabled={currentPage === Math.ceil(coletas.length / itemsPerPage)}>Próxima Página</button>
        </div>
      </div>
    </>
  )
};

export default HistoricoE;
