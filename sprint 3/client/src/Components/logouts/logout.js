import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

function Logout() {


  function handleLogoutConfirm() {
    // Remover os itens do localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('parceiro');
    // Redirecionar para a página inicial
    window.location.href = 'http://localhost:3000/';
  }


  return (
    <div className="logoutContainer">
      <div className='logout'>
      <div className='logoutSessao1'>
      <FontAwesomeIcon icon={faTriangleExclamation} size="4x" color='red' />
      <h1>Saindo da conta...</h1>
      <p>Voce tem certeza que quer sair da sessão?</p>
      </div>
      <div className='logoutSessao'>
        <button id="botao1" onClick={handleLogoutConfirm}>Sim</button>
      </div>
      </div>
    </div>
  );
}

export default Logout;

