import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const ParceirosDashboardBarra = () => {
  const [parceirosData, setParceirosData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/parceirosGrafico')
      .then(response => {
        const parceirosComCompras = response.data.filter(parceiro => parceiro.compras !== undefined && parceiro.compras >= 0);
        setParceirosData(parceirosComCompras);
      })
      .catch(error => {
        console.error('Erro ao obter dados dos parceiros:', error);
      });
  }, []);

  const chartData = {
    labels: parceirosData ? parceirosData.map(parceiro => parceiro.nomeOrganizacao) : [],
    datasets: [
      {
        label: 'Quantidade de Compras',
        data: parceirosData ? parceirosData.map(parceiro => parceiro.compras) : [],
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

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Bar data={chartData} options={options} />
    </>
  );
};

export default ParceirosDashboardBarra;
