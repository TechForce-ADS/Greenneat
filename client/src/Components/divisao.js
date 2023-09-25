import React from 'react';
import LogoQ from '../img/logoquad.png';
import { Link } from 'react-router-dom';



function ShowLogin() {
  let DivisaoAnte = document.querySelector('#divisaoAnte');
  let Divisao = document.querySelector('#divisao');
  Divisao.classList.add('hide')
  DivisaoAnte.classList.remove('hide')
}

function ShowParceiro() {
  let Divisao = document.querySelector('#divisao');
  let formCadastro = document.querySelector('#containerCadastro');
  Divisao.classList.add('hide')
  formCadastro.classList.remove('hide')
}

function ShowEstabelecimento() {
  let Divisao = document.querySelector('#divisao');
  let formEstabelecimento = document.querySelector('#containerEstabelecimento');
  Divisao.classList.add('hide')
  formEstabelecimento.classList.remove('hide')
}



function Divisao() {
  return (
    <>
      <div id="divisao"className="boxDivisao hide">
        <img src={LogoQ} alt="LogoQ" className="logoQuadDivi" />
        <button onClick={ShowParceiro} className='divisao'> Criar conta como parceiro</button>
        <button onClick={ShowEstabelecimento} className='divisao'> Criar conta como estabelecimento</button>
        <h5>OU</h5>
        <button onClick={ShowLogin} className='divisaoLogin'> Faça Login</button>
      </div>
    </>
  );
}

export default Divisao;