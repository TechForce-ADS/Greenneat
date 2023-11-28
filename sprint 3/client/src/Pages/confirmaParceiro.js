import React, { useState, useEffect } from 'react';
import axios from 'axios';


function ConfirmaParceiro() {
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  useEffect(() => {
    const fetchConfirmationStatus = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        const response = await axios.get(`http://localhost:3001/confirmatokenParceiro=${token}`);
          
        if (response.status === 200) {
          // Email confirmado com sucesso
          setEmailConfirmed(true);
        } else {
          // Exibir mensagem de erro caso ocorra algum problema na confirmação do email
          console.log('Ocorreu um erro ao confirmar o email');
        }
      } catch (error) {
        console.log('Ocorreu um erro:', error);
      }
    };

    fetchConfirmationStatus();
  }, []); // Executa apenas uma vez, quando o componente é montado

  const handleConfirmation = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      const response = await axios.get(`http://localhost:3001/confirmatokenParceiro=${token}`);
        
      if (response.status === 200) {
        // Email confirmado com sucesso
        setEmailConfirmed(true);

        // Atualizar o valor no banco de dados
        const updateResponse = await axios.post('http://localhost:3001/atualizar-email-confirmado', { token });
        if (updateResponse.status === 200) {
          console.log('Valor do emailConfirmed atualizado no banco de dados');
        } else {
          console.log('Ocorreu um erro ao atualizar o valor no banco de dados');
        }
      } else {
        // Exibir mensagem de erro caso ocorra algum problema na confirmação do email
        console.log('Ocorreu um erro ao confirmar o email');
      }
    } catch (error) {
      console.log('Ocorreu um erro:', error);
    }
  };

  return (
    <div className='confirmContainer'>
      {!emailConfirmed ? (
        <div>
          <h1>Confirmação de Email</h1>
          <p>Clique no botão abaixo para confirmar seu email:</p>
          <div className='btnConfirm'>
          <button id='btnConfirm' onClick={handleConfirmation}>Confirmar Email</button>
          </div>
        </div>
      ) : (
        <div className='confirmContainer'>
          <h1>Email Confirmado!</h1>
          <p>O seu email foi confirmado com sucesso!</p>
          <p>Voce jâ pode fechar essa guia.</p>
        </div>
      )}
    </div>
  );
}

export default ConfirmaParceiro;