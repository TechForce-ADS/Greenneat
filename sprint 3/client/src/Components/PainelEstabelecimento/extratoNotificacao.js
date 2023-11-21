import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExtratoE() {
  const [compras, setCompras] = useState([]);
  const [estabelecimento, setEstabelecimento] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      window.location.href = 'http://localhost:3000/';
    }
  }, []);

  useEffect(() => {
    const email = localStorage.getItem('email');

    fetch(`http://localhost:3001/perfil/${email}`)
      .then((response) => response.json())
      .then((data) => {
        setEstabelecimento(data);
      })
      .catch((error) => console.error('Erro ao obter dados do perfil:', error));
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

  if (compras.length === 0) {
    return <div>Carregando...</div>;
  }

  const formatarData = (dataOriginal) => {
    const data = new Date(dataOriginal);
    const ano = data.getFullYear();
    const mes = ('0' + (data.getMonth() + 1)).slice(-2);
    const dia = ('0' + data.getDate()).slice(-2);
    return `${dia}-${mes}-${ano}`;
  };

  const comprasExibidas = compras.slice(0, 5);

  return (
    <>
      {comprasExibidas.map((compra) => (
        <div style={{ marginBottom: '20px' }} key={compra.id}>
          <p>
            <b>Data da Transação:</b> {formatarData(compra.createdAt)}
          </p>
          <p>
            <b>Valor Total</b>:{' '}
            {compra.total !== undefined && compra.total !== null ? `$${compra.total.toFixed(2)}` : 'N/A'}
          </p>
          <hr />
        </div>
      ))}
    </>
  );
}

export default ExtratoE;

