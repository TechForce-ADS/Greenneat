import React from 'react';
import Navbar from '../../Components/navbar/navbar';
import FormCadastro from '../Components/formCadastro';

function Cadastro() {
  return (
    <>
        <Navbar activeLink="/cadastro"/>
        <body>
          <div className='container'>
          <FormCadastro />
          </div>
        </body>
      </>
  );
}

export default Cadastro;