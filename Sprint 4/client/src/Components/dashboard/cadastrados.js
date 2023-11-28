import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/estabelecimentosParceirosGrafico');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Erro ao buscar dados do gráfico:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <>
      {data.parceiros && data.estabelecimentos ? (
        <Pie
          data={{
            labels: ['Parceiros', 'Estabelecimentos'],
            datasets: [
              {
                data: [data.parceiros, data.estabelecimentos],
                backgroundColor: [
                  '#87BC87',  
                   
                  '#7ED957',  
                 
                ],
                hoverBackgroundColor: [
                  '#009f57', 
                  '#80D080', 
                  '#2B8C2B', 
                  '#6DBF6D', 
                  '#79A079', 
                  '#AACC99', 
                ],
              },
            ],
          }}
        />
      ) : (
        <p>Carregando...</p>
      )}
    </>
  );
};

export default App;
