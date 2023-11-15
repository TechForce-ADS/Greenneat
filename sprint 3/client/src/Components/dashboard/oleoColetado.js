import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Mudança para Bar
import axios from 'axios';

const OleoColetado = () => {
  const [parceirosData, setParceirosData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/parceirosGrafico')
      .then(response => {
        const parceirosComLitrosColetados = response.data.filter(parceiro => parceiro.litrosColetados !== undefined && parceiro.litrosColetados > 0);
        setParceirosData(parceirosComLitrosColetados);
      })
      .catch(error => {
        console.error('Erro ao obter dados dos parceiros:', error);
        setParceirosData([]);
      });
  }, []);

  const chartData = {
    labels: parceirosData.map(parceiro => parceiro.nomeOrganizacao),
    datasets: [
      {
        label: 'Litros Coletados',
        data: parceirosData.map(parceiro => parceiro.litrosColetados),
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
    scales: {
      x: { 
        title: {
          display: true,
          text: 'Parceiros',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Litros Coletados',
        },
      },
    },
  };

  return (
    <div>
      {parceirosData.length > 0 ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>Nenhum dado disponível para exibição</p>
      )}
    </div>
  );
};

export default OleoColetado;
