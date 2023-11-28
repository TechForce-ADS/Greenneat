import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VincularEstabelecimento() {
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [selectedEstabelecimento, setSelectedEstabelecimento] = useState(null);
  const [vinculoSucesso, setVinculoSucesso] = useState(null);

  useEffect(() => {
    // Carregar a lista de estabelecimentos disponíveis
    async function fetchEstabelecimentos() {
      try {
        const response = await axios.get('http://localhost:3001/estabelecimentos');
        setEstabelecimentos(response.data);
      } catch (error) {
        console.error('Erro ao obter estabelecimentos disponíveis:', error);
      }
    }

    fetchEstabelecimentos();
  }, []);

  const handleVincularClick = async () => {
    if (selectedEstabelecimento) {
      const emailParceiro = localStorage.getItem('email');
      const nomeOrganizacaoEstabelecimento = selectedEstabelecimento.nomeOrganizacao;

      try {
        await axios.post('http://localhost:3001/vincularEstabelecimento', {
          emailParceiro,
          nomeOrganizacaoEstabelecimento,
        });

        // Atualizar a lista de estabelecimentos após a vinculação
        const response = await axios.get('http://localhost:3001/estabelecimentos');
        setEstabelecimentos(response.data);

        // Atualizar o estado para indicar sucesso
        setVinculoSucesso(true);

        // Lógica adicional após a vinculação (se necessário)
      } catch (error) {
        console.error('Erro ao vincular estabelecimento:', error);

        // Atualizar o estado para indicar falha
        setVinculoSucesso(false);
        
      }
      window.location.reload();
    }
  };

 

  return (
    <>
      <div className='Vinculos hide'>
        <h2>Estabelecimentos</h2>
        <br></br>
        <ul>
          {estabelecimentos.map((estabelecimento) => (
            <li key={estabelecimento.id}>
              {estabelecimento.nomeOrganizacao}
              <button onClick={() => setSelectedEstabelecimento(estabelecimento)}>Selecionar</button>
            </li>
          ))}
        </ul>
        {selectedEstabelecimento && (
          <div className='VincularBox'>
            <h3>Vincular Estabelecimento</h3>
            <p>Nome do Estabelecimento:<b> {selectedEstabelecimento.nomeOrganizacao}</b></p>
            <button onClick={handleVincularClick}>Vincular</button>
            {vinculoSucesso === true && <p>Vínculo criado com sucesso!</p>}
            {vinculoSucesso === false && <p>Estabelecimento já vinculado.</p>}

          </div>
        )}
      </div>
    </>
  );
}

export default VincularEstabelecimento;
