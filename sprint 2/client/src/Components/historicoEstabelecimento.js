import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HistoricoEstabelecimento() {
  const [coletas, setColetas] = useState([]);
  const [estabelecimento, setEstabelecimento] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");

    fetch(`http://localhost:3001/perfil/${email}`)
      .then(response => response.json())
      .then(data => {
        console.log("Dados do perfil:", data);
        setEstabelecimento(data);
      })
      .catch(error => console.error("Erro ao obter dados do perfil:", error));
  }, []);

  useEffect(() => {
    if (estabelecimento && estabelecimento.id) {
      const estabelecimentoId = estabelecimento.id;
      async function fetchData() {
        try {
          const response = await axios.get(`http://localhost:3001/historicoEstabelecimento?estabelecimentoId=${estabelecimentoId}`);
          setColetas(response.data);
        } catch (error) {
          console.error('Erro ao buscar as transações:', error);
        }
      }

      fetchData();
    }
  }, [estabelecimento]);

  if (coletas.length === 0) {
    return <div>Carregando...</div>;
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
          <th>Óleo cedido (L)</th>
          <th>Créditos recebido</th>
          <th>Parceiro</th>
          <th>Data da Transação</th>
        </tr>
      </thead>
      <tbody>
        {coletas.map((coleta) => (
          <tr key={coleta.id}>
            <td>{coleta.quantidadeDeOleo}</td>
            <td>{coleta.credito}</td>
            <td>{coleta.Parceiro.nomeOrganizacao}</td>
            <td>{formatarData(coleta.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default HistoricoEstabelecimento;
