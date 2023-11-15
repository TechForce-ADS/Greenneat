import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2'; // Mudança para Bar
import axios from 'axios';


const OleoCedido = () => {
  const [estabelecimentoData, setEstabelecimentoData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/estabelecimentoGrafico')
      .then(response => {
        const EstabelecimentoOleoCedido = response.data.filter(estabelecimento => estabelecimento.oleoCedido !== undefined && estabelecimento.oleoCedido > 0);
        setEstabelecimentoData(EstabelecimentoOleoCedido);
      })
      .catch(error => {
        console.error('Erro ao obter dados dos estabelecimentos:', error);
        setEstabelecimentoData([]);
      });
  }, []);

  const chartData = {
    labels: estabelecimentoData.map(estabelecimento => estabelecimento.nomeOrganizacao),
    datasets: [
      {
        label: 'Litros Coletados',
        data: estabelecimentoData.map(estabelecimento => estabelecimento.oleoCedido),
        backgroundColor: [
          '#00BF63',
          '#90EE90',
          '#32CD32',
          '#7ED957',
          '#87BC87',
          '#CIFF72',
        ],
      },
    ],
  };

  const chartOptions = {
   
  };

  return (
    <div>
      {estabelecimentoData.length > 0 ? (
        <Pie data={chartData} options={chartOptions} />
      ) : (
        <p>Nenhum dado disponível para exibição</p>
      )}
    </div>
  );
};

export default OleoCedido;
