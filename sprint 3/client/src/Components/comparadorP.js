import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { format } from 'date-fns';

const OleoPrecoPorMes = () => {
  const [oleoInfoPorMes, setOleoInfoPorMes] = useState([]);
  const [tipoSelecionado, setTipoSelecionado] = useState('usado'); // Padrão: 'usado'

  useEffect(() => {
    axios.get(`http://localhost:3001/oleoInfoPorMes?tipo=${tipoSelecionado}`)
      .then(response => {
        setOleoInfoPorMes(response.data);
      })
      .catch(error => {
        console.error(`Erro ao obter dados de oleoInfo (${tipoSelecionado}) por mês:`, error);
      });
  }, [tipoSelecionado]); // Atualiza sempre que o tipo selecionado mudar

  const handleTipoChange = (event) => {
    setTipoSelecionado(event.target.value);
  };

  const mesesExibicao = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const dadosPorMes = mesesExibicao.map(mes => {
    const mesCorrespondente = `${new Date().getFullYear()}-${(mesesExibicao.indexOf(mes) + 1).toString().padStart(2, '0')}`;
    const dadosMes = oleoInfoPorMes.filter(item => item.createdAt.startsWith(mesCorrespondente));
    
    const precosPorMes = dadosMes.map(dado => ({
      preco: dado.preco,
      createdAt: format(new Date(dado.createdAt), 'dd/MM/yyyy'), // Formato personalizado
    }));

    return precosPorMes;
  }).flat(); // "Achatando" o array de arrays em um único array

  const chartData = {
    labels: dadosPorMes.map(item => item.createdAt),
    datasets: [
      {
        label: `Preço de Óleo ${tipoSelecionado}`,
        data: dadosPorMes.map(item => item.preco),
        borderColor: '#00BF63',
        fill: false,
        pointRadius: 5, // Define o tamanho do ponto no gráfico
        pointHoverRadius: 8, // Define o tamanho do ponto ao passar o mouse
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Meses',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Preço do Óleo',
        },
      },
    },
  };

  return (
    <div>
      <label>
        Escolha o Tipo de Óleo:
        <select style={{marginLeft:"10px"}} value={tipoSelecionado} onChange={handleTipoChange}>
          <option value="usado">Usado</option>
          <option value="novo">Novo</option>
        </select>
      </label>
      {oleoInfoPorMes.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Nenhum dado disponível para exibição</p>
      )}
    </div>
  );
};

export default OleoPrecoPorMes;
