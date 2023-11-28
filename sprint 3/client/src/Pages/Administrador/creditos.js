import React from 'react';
import Navbar from '../../Components/navbar/navbarAdministrador';
import AdicionarCredito from '../../Components/adicionarCreditos';


function Creditos() {
  return (
    <>
        <Navbar activeLink="/creditos"/>
        <body>
        <div className='containerLogin'>
          <AdicionarCredito />
          </div>
        </body>
      </>
  );
}

export default Creditos;