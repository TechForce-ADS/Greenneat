import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Historico() {
  const [coletas, setColetas] = useState([]);
  const [parceiro, setParceiro] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('email');

    fetch(`http://localhost:3001/perfil/${email}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Dados do perfil:', data);
        setParceiro(data);
      })
      .catch((error) =>
        console.error('Erro ao obter dados do perfil:', error)
      );
  }, []);

  useEffect(() => {
    if (parceiro && parceiro.id) {
      const parceiroId = parceiro.id;
      async function fetchData() {
        try {
          const response = await axios.get(
            `http://localhost:3001/historicoParceiro?parceiroId=${parceiroId}`
          );
          // Limitando para exibir apenas os 5 mais recentes
          const recentes = response.data.slice(0, 5);
          setColetas(recentes);
        } catch (error) {
          console.error('Erro ao buscar as transações:', error);
        }
      }

      fetchData();
    }
  }, [parceiro]);

  return (
    <>
      <div>
        {coletas.map((coleta) => (
          <h7 key={coleta.id}>
            <p style={{ marginTop: '10px' }}>
              <strong>
                {coleta.Estabelecimento
                  ? coleta.Estabelecimento.nomeOrganizacao
                  : 'N/A'}{' '}
                - {coleta.quantidade}(L) - Óleo {coleta.tipo}{' '}
              </strong>{' '}
            </p>
          </h7>
        ))}
      </div>
    </>
  );
}

export default Historico;
