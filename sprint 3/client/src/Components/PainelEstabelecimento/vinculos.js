import React, { useEffect, useState } from 'react';
import axios from 'axios';




function VincularEstabelecimento() {
  const [estabelecimentos, setEstabelecimento] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [parceiros, setParceiros] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");

    fetch(`http://localhost:3001/perfil/${email}`)
      .then((response) => response.json())
      .then((data) => {
        setEstabelecimento(data);

      })
      .catch((error) => console.error("Erro ao obter dados do perfil:", error));
  }, []);


  useEffect(() => {
    const email = localStorage.getItem('email');

    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3001/parceiroDoEstabelecimento/${email}`);
  
        if (response.data.parceiros && Array.isArray(response.data.parceiros)) {
          setParceiros(response.data.parceiros);
        } else {
          setError('Resposta inválida da API');
        }
      } catch (error) {
        console.error('Erro ao buscar parceiros:', error);
        setError('Erro ao buscar parceiros');
      } finally {

        setIsLoading(false);
      }
    }

    fetchData();
  }, []);




  return (
    <>
      <h2 style={{ marginTop: '5%', animation: 'fadeIn 1s' }} id='textoCarteira' className='hide'>
        Seus parceiros
      </h2>
  
      {isLoading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className='nomesParceiros'>
          {parceiros.map((parceiro) => (
            <h3 style={{marginTop:'5%', marginLeft:'15px', width:'100%'}} key={parceiro.id}> {parceiro.nomeOrganizacao}</h3>
          ))}
  
          {parceiros.length === 0 && (
            <p>Nenhum parceiro associado encontrado.</p>
          )}
        </div>
      )}
    </>
  );
  
}

export default VincularEstabelecimento;
