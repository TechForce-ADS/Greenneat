import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HistoricoCredito() {
  const [creditos, setCreditos] = useState([]);
  const [parceiro, setParceiro] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("email");

    fetch(`http://localhost:3001/perfil/${email}`)
      .then(response => response.json())
      .then(data => {
        console.log("Dados do perfil:", data);
        setParceiro(data);
      })
      .catch(error => console.error("Erro ao obter dados do perfil:", error));
  }, []);




  useEffect(() => {
    if (parceiro && parceiro.id) {
      const parceiroId = parceiro.id;
      async function fetchData() {
        try {
          const response = await axios.get(`http://localhost:3001/historicoCredito?parceiroId=${parceiroId}`);
          setCreditos(response.data);
        } catch (error) {
          console.error('Erro ao buscar as transações:', error);
        } finally {
          setIsLoading(false);
        }
      }

      fetchData();
    }
  }, [parceiro]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (creditos.length === 0) {
    return <div>Nenhum registro encontrado.</div>;
  }

  const formatarData = (dataOriginal) => {
    const data = new Date(dataOriginal);
    const ano = data.getFullYear();
    const mes = ('0' + (data.getMonth() + 1)).slice(-2);
    const dia = ('0' + data.getDate()).slice(-2);
    return `${dia}-${mes}-${ano}`;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Créditos comprados</th> 
          <th>Valor</th>
          <th>Data da Transação</th>
        </tr>
      </thead>
      <tbody>
        {creditos.map((credito) => (
          <tr key={credito.id}>
            <td>{credito.credito}</td>
            <td>{(credito.valor * 1.29).toFixed(2)}</td>
            <td>{formatarData(credito.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  
}

export default HistoricoCredito;
