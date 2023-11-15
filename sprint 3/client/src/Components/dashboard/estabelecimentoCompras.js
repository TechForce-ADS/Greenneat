import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const EstabelecimentosDashboard = () => {
  const [estabelecimentosData, setEstabelecimentosData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/estabelecimentosGrafico')
      .then(response => {
        const estabelecimentosComCompras = response.data.filter(estabelecimento => estabelecimento.compras !== undefined && estabelecimento.compras >= 0);
        setEstabelecimentosData(estabelecimentosComCompras);
      })
      .catch(error => {
        console.error('Erro ao obter dados dos estabelecimentos:', error);
      });
  }, []);

  const chartData = {
    labels: estabelecimentosData ? estabelecimentosData.map(estabelecimento => estabelecimento.nomeOrganizacao) : [],
    datasets: [
      {
        data: estabelecimentosData ? estabelecimentosData.map(estabelecimento => estabelecimento.compras) : [],
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

export default EstabelecimentosDashboard;
