import React from 'react';

function ShowParceiro() {
  let Gestao = document.querySelector('#boxGestao');
  let Parceiro = document.querySelector('#table-parceiro');
  let Voltar = document.querySelector('#bt-voltar');

  Voltar.classList.remove('hide')
  Gestao.classList.remove('container-md')
  Gestao.classList.add('hide')
  Parceiro.classList.remove('hide')
}



function Voltar() {
  let Gestao = document.querySelector('#boxGestao');
  let Parceiro = document.querySelector('#table-parceiro');
  let Voltar = document.querySelector('#bt-voltar');
  let Estabelecimento = document.querySelector('#table-estabelecimento');

  Voltar.classList.add('hide')
  Gestao.classList.add('container-md')
  Gestao.classList.remove('hide')
  Parceiro.classList.add('hide')
  Estabelecimento.classList.add('hide')
}




function ShowEstabelecimento() {
  let Gestao = document.querySelector('#boxGestao');
  let Estabelecimento = document.querySelector('#table-estabelecimento');
  let Voltar = document.querySelector('#bt-voltar');

  Voltar.classList.remove('hide')
  Gestao.classList.remove('container-md')
  Gestao.classList.add('hide')
  Estabelecimento.classList.remove('hide')
}

function FormParceiroEstabelecimento() {
  return (
    <>
      <div id="boxGestao" className='container-md '>
        <h2>Ver tabela dos:</h2>
        <button onClick={ShowEstabelecimento} className='container-md-button'>Estabelecimentos</button>
        <button onClick={ShowParceiro} className='container-md-button'>Parceiros</button>
        {/* <button className='container-md-button'>Administrador</button> */}
        
      </div>
      <button id='bt-voltar' onClick={Voltar} className='container-md-button hide'>Voltar</button>
    </>
  );
}

export default FormParceiroEstabelecimento;