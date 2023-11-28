import React from 'react';
import NavbarE from '../../Components/navbar/navbarC';
import Produtos from '../../Components/produtosComum';



function Produto() {


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