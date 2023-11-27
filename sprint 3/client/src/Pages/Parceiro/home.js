import React from 'react';
import NavbarP from '../../Components/navbar/navbarParceiro.js';
import Bola from '../../img/bola.png';
import { useEffect } from 'react';

function Home() {



  useEffect(() => {
    // Verificar se há um usuário logado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn ) {
      window.location.href = 'http://localhost:3000/';
    }
  }, []);


  return (
    <>
      <NavbarP activeLink="/" />
      <body>
        <div className='homeBanner'>
          <h1>GREENNEAT</h1>
          <h2>Somos uma empresa de limpeza sustentável,
            com a iniciativa de um projeto de reciclagem e
            ressignificação do uso de óleo usados por
            estabelecimentos, assim contribuindo com a
            economia circular.</h2>
        </div>
        <div className='homeInfo'>
          <div className='homeText'>
            <img src={Bola} alt='Bola'></img>
            <h2><p>
              O projeto sistema circular de produção de saneantes a partir de
              óleo recuperado, tem o objetivo de envolver os agentes
              participantes da cadeia de descarte e reciclagem do óleo de
              fritura usado.</p>
              <p>
                Estima-se que apenas 2% de todo óleo vegetal consumido é de
                fato reciclado no Brasil.</p>
            </h2>
          </div>
        </div>
        <div className='homeVideo'>
          <h1>Conheça mais sobre nosso trabalho</h1>
          <h3>Nesse vídeo, produzido pela Rede Mãe que faz, você pode ver um pouco do nosso trabalho.</h3>
          <div class="ratio ratio-16x9">
            <iframe src="https://www.youtube.com/embed/Bx13qfYTFEM" title="YouTube video" allowfullscreen></iframe>
          </div>
        </div>
        <div className='homeInfo'>
          <h4>Em nossa visão a limpeza diária pode ser realizada com produtos suaves, hipoalergênicos e amigáveis à sua saúde e ao meio ambiente.⁣ ⁣
            Prezamos pela transparência de informações na formulação e embalagem, por isso, você tem o direito de saber exatamente o
            que está dentro do produto que você usa. Nossos produtos são comercializados na forma de refil concentrado, reduzindo a embalagem,
            o transporte de água e simplificando seu armário de produtos de limpeza. ⁣ ⁣ Simplicidade de formulação e embalagem estão em nosso DNA.
            Venha você também participar conosco dessa revolução em limpeza impulsionada por escolhas conscientes, que cuidam do planeta sem abrir mão
            do desempenho e praticidade na hora de limpar sua casa.⁣</h4>
        </div>

      </body>
    </>
  );
}

export default Home;