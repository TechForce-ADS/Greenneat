import React from 'react';
import Navbar from '../../Components/navbar/navbarC';
import Produtos from '../../Components/produtos';

function Produto() {
  return (
    <body>
      <Navbar activeLink="/produto" />
      <div className='containerProduto'>
        <Produtos />
      </div>
    </body>
  );
}

export default Produto;