import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2'; // Modificado para Pie
import axios from 'axios';

const ParceirosDashboard = () => {
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

  return (
    <>
    <Pie data={chartData} /> 
    </>
  );
};

export default ParceirosDashboard;
