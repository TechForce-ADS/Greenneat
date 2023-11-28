import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VincularEstabelecimento() {
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [parceiro, setParceiro] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");

    fetch(`http://localhost:3001/perfil/${email}`)
      .then((response) => response.json())
      .then((data) => {
        setParceiro(data);

      })
      .catch((error) => console.error("Erro ao obter dados do perfil:", error));
  }, []);


  useEffect(() => {
    const email = localStorage.getItem('email');

    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3001/dadosEstabelecimentoParceiro/${email}`);
  
        if (response.data.estabelecimentos && Array.isArray(response.data.estabelecimentos)) {
          setEstabelecimentos(response.data.estabelecimentos);
        } else {
         
          setError('Resposta inválida da API');
        }
      } catch (error) {
        console.error('Erro ao buscar estabelecimentos:', error);
        setError('Erro ao buscar estabelecimentos');
      } finally {
        
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);




  return (
    <>
      <h2 style={{ marginTop: '5%', animation: 'fadeIn 1s' }} id='textoCarteira' className='hide'>
        Seus estabelecimentos
      </h2>

      {isLoading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="estabelecimentos-table ">
        

            {estabelecimentos.map((estabelecimento) => (
              <div key={estabelecimento.id}>
                <h2>{estabelecimento.nomeOrganizacao}</h2>
      
                 

         
              </div>
            ))}



            {estabelecimentos.length === 0 && (
              <tr>
                <td colSpan="7">Nenhum estabelecimento associado encontrado.</td>
              </tr>
            )}
          
        </div>
      )}
    </>
  );
}

export default VincularEstabelecimento;
