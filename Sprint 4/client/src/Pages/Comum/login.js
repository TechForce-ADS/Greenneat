import React from 'react';
import Navbar from '../../Components/navbar/navbarC';
import FormCadastro from '../../Components/forms/formCadastro';
import Divisao from '../../Components/divisao';
import DivisaoAnte from '../../Components/divisaoAnte.js';
import FormLoginParceiros from '../../Components/forms/FormLoginParceiros'
import FormEstabelecimento from '../../Components/forms/formEstabelecimento';
import FormLoginEstabelecimento from '../../Components/forms/formLoginEstabelecimento';
import FormLoginADM from '../../Components/forms/formLoginADM.js';


function Login() {
  return (
    <>
      <body>
      <Navbar activeLink="/login" />
          <div className='containerLogin'>
            <DivisaoAnte />
            <FormLoginParceiros />
            <FormLoginEstabelecimento />
            <Divisao />
            <FormCadastro />
            <FormLoginADM />
            <FormEstabelecimento />
          </div>
      </body>
    </>

  );
}

export default Login;