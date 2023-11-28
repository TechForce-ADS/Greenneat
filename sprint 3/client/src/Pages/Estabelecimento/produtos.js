import React from 'react';
import NavbarE from '../../Components/navbar/navbarEstabelecimento';
import Produtos from '../../Components/produtos';
import { useEffect } from 'react';


function Produto() {

  useEffect(() => {
    // Verificar se há um usuário logado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn ) {
      window.location.href = 'http://localhost:3000/';
    }
  }, []);


  return (
    <body>


      <NavbarE activeLink="/produto" />
      <div className='containerProduto'>
        <Produtos />
      </div>
    </body>
  );
}

export default Produto;