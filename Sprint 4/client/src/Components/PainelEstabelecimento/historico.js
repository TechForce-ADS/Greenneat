import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HistoricoE() {
  const [coletas, setColetas] = useState([]);
  const [estabelecimento, setEstabelecimento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um usuário logado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      window.location.href = 'http://localhost:3000/';
    }
  }, []);

  useEffect(() => {
    const email = localStorage.getItem('email');

    fetch(`http://localhost:3001/perfil/${email}`)
      .then(response => response.json())
      .then(data => {
        console.log('Dados do perfil:', data);
        setEstabelecimento(data);
      })
      .catch(error => console.error('Erro ao obter dados do perfil:', error));
  }, []);

  useEffect(() => {
    if (estabelecimento && estabelecimento.id) {
      const EstabelecimentoId = estabelecimento.id;

      async function fetchData() {
        try {
          const response = await axios.get(`http://localhost:3001/historicoEstabelecimento?EstabelecimentoId=${EstabelecimentoId}`);
          setColetas(response.data);
        } catch (error) {
          console.error('Erro ao buscar as transações:', error);
        } finally {
          setLoading(false);
        }
      }

      fetchData();
    }
  }, [estabelecimento]);

  // const formatarData = (dataOriginal) => {
  //   const data = new Date(dataOriginal);
  //   const ano = data.getFullYear();
  //   const mes = ('0' + (data.getMonth() + 1)).slice(-2);
  //   const dia = ('0' + data.getDate()).slice(-2);
  //   return `${dia}-${mes}-${ano}`;
  // };

  return (
    <>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {coletas.slice(-5).map((coleta) => (
              <h7  key={coleta.id}>
                <p style={{marginTop:'10px'}}><strong>{coleta.Parceiro ? coleta.Parceiro.nomeOrganizacao : 'Parceiro Deletado'} - {coleta.quantidade}(L) - Óleo {coleta.tipo} </strong>  {/*{formatarData(coleta.createdAt)} */} </p>                
              </h7>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default HistoricoE;
