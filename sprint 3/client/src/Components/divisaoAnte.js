import React from 'react';
import LogoQ from '../img/logoquad.png';
import { Link } from 'react-router-dom';



function ShowCadastre() {
  let DivisaoAnte = document.querySelector('#divisaoAnte');
  let Divisao = document.querySelector('#divisao');
  DivisaoAnte.classList.add('hide')
  Divisao.classList.remove('hide')

}

function ShowParceiro() {
  let Divisao = document.querySelector('.boxDivisao');
  let formLoginParceiro = document.querySelector('#boxLoginParceiro');
  Divisao.classList.add('hide')
  formLoginParceiro.classList.remove('hide')
}

function ShowEstabelecimento() {
  let Divisao = document.querySelector('.boxDivisao');
  let formEstabelecimento = document.querySelector('.boxLoginEstabelecimento');
  Divisao.classList.add('hide')
  formEstabelecimento.classList.remove('hide')
}



function DivisaoAnte() {
  return (
    <>
      <div id="divisaoAnte" className="boxDivisao ">
        <img src={LogoQ} alt="LogoQ" className="logoQuadDivi" />
        <button onClick={ShowParceiro} className='divisao'> Se conectar como parceiro</button>
        <button onClick={ShowEstabelecimento} className='divisao'> Se conectar como estabelecimento</button>
        <h5>OU</h5>
        <button onClick={ShowCadastre} className='divisaoLogin'> Cadastre-se</button>
      </div>
    </>
  );
}

export default DivisaoAnte;