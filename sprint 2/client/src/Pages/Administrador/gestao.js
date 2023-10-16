import React from 'react';
import Navbar from '../../Components/navbar/navbarAdministrador';
import FormParceiroEstabelecimento from '../../Components/forms/FormParceiroEstabelecimento';
import ListaParceiros from './parceiros';
import ListaEstabelecimentos from './estabelecimentos';
import Modal from './exibeParceiro';

function Gestao() {
  return (
    <>
      <body>
      <Navbar activeLink="/gestao" />
          <div className='containerLogin'>
            <FormParceiroEstabelecimento />
            <ListaParceiros />
            <ListaEstabelecimentos />
            <Modal />
          </div>
      </body>
    </>

  );
}

export default Gestao;