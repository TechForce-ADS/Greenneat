import React from 'react';
import LogoQ from '../../img/logoquad.png';


function ShowVinculos() {
  let Gestao = document.querySelector('#boxGestao2');
  let Vinculos = document.querySelector('.estabelecimentos-table');
  let Voltar = document.querySelector('#bt-voltar2');
  let Texto = document.querySelector('#textoCarteira');


  Voltar.classList.remove('hide')
  Gestao.classList.add('hide')
  Gestao.classList.remove('container-md')
  Vinculos.classList.remove('hide')
  Texto.classList.remove('hide')
}


function ShowVincular() {
    let Gestao = document.querySelector('#boxGestao2');
    let Vinculos = document.querySelector('.Vinculos');
    let Voltar = document.querySelector('#bt-voltar2');
    
    Voltar.classList.remove('hide')
    Gestao.classList.add('hide')
    Gestao.classList.remove('container-md')
    Vinculos.classList.remove('hide')
  }
  

function Voltar() {
    let Gestao = document.querySelector('#boxGestao2');
    let Vinculos = document.querySelector('.estabelecimentos-table');
    let Voltar = document.querySelector('#bt-voltar2');
    let Vincular = document.querySelector('.Vinculos');
    let Texto = document.querySelector('#textoCarteira');

    Voltar.classList.add('hide')
    Texto.classList.add('hide')
    Gestao.classList.add('container-md')
    Gestao.classList.remove('hide')
    Vinculos.classList.add('hide')
    Vincular.classList.add('hide')
 

}






function FormParceiroEstabelecimento() {
  return (
    <>
     
      <div  id="boxGestao2" className='container-md '>
      <img src={LogoQ} alt="LogoQ" className="logoQuadDivi" />
        <h2>Administrar:</h2>
        
        <button onClick={ShowVinculos} className='container-md-button'>Seus estabelecimentos</button>
        <button onClick={ShowVincular} className='container-md-button'>Novo estabelecimento</button>
       
       
        
      </div>
      <button id='bt-voltar2' onClick={Voltar} className='container-md-button hide'>Voltar</button>
    </>
  );
}

export default FormParceiroEstabelecimento;