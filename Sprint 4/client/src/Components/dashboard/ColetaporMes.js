import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';



const OleoColetadoPorMes = () => {
    const [coletasPorMes, setColetasPorMes] = useState([]);
  
    useEffect(() => {
        axios.get('http://localhost:3001/coletasPorMes')
          .then(response => {
            console.log(response.data); // Log the data received from the server
            setColetasPorMes(response.data);
          })
          .catch(error => {
            console.error('Erro ao obter dados das coletas por mês:', error);
          });
      }, []);
      
  
    const mesesExibicao = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const totaisPorMes = mesesExibicao.map((mesExibicao, index) => {
        const mesCorrespondente = `${new Date().getFullYear()}-${(index + 1).toString().padStart(2, '0')}`;
        const dadoMes = coletasPorMes.find(item => item.anoMes === mesCorrespondente);
      
        return {
          mes: mesExibicao,
          totalQuantidade: dadoMes ? dadoMes.totalQuantidade : 0,
        };
      });
      
      

      const chartData = {
        labels: totaisPorMes.map(item => item.mes),
        datasets: [
          {
            label: 'Quantidade de Óleo Coletado por Mês',
            data: totaisPorMes.map(item => item.totalQuantidade),
            backgroundColor: '#00BF63', // Cor da barra
          },
        ],
      };
      
  
    return (
      <div>
        {coletasPorMes.length > 0 ? (
          <Bar data={chartData} />
        ) : (
          <p>Nenhum dado disponível para exibição</p>
        )}
      </div>
    );
  };
  
  export default OleoColetadoPorMes;
  