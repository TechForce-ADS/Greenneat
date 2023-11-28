import React from 'react';
import Navbar from '../../Components/navbar/navbarParceiro';
import AdicionarCredito from '../../Components/comprarCreditos';
import { useEffect } from 'react';

function Creditos() {

   useEffect(() => {
        // Verificar se há um usuário logado
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn ) {
          window.location.href = 'http://localhost:3000/';
        }
      }, []);

  return (
    <>
        <Navbar activeLink="/ComprarCredito"/>
        <body>
        <div className='containerLogin'>
          <AdicionarCredito />
          </div>
        </body>
      </>
  );
}

export default Creditos;