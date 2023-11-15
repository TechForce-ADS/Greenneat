import React from 'react';
import NavbarE from '../../Components/navbar/navbarC';
import prod1 from '../../img/oleo1.png';
import prod2 from '../../img/sabao.png';
import prod3 from '../../img/branqueador.png';
import prod4 from '../../img/limpav.png';
import prod5 from '../../img/olao2.png';
import prod6 from '../../img/pano.png';
import prod7 from '../../img/bucha.png';
import prod8 from '../../img/kits.png';



function Produto() {


  return (
    <body>

      <NavbarE activeLink="/produto" />
      <div className='containerProduto'>
      <div className='ProdutoText'>
        <h1>Produtos</h1>
        <h4>A linha GREENNEAT de produtos de limpeza é produzida com os melhores compostos derivados de fontes naturais e renováveis,
          garantindo uma excelente limpeza para sua casa. Em nossa visão a limpeza diária pode ser realizada com produtos suaves, hipoalergênicos e
          amigáveis à sua saúde e ao meio ambiente.⁣ </h4>
      </div>
      <div id='boxProdutos' class="boxProdutos">

        <div className='Produto'>
          <img src={prod1} alt="produto1" />
          <h3>Multiuso concentrado rende 500 mL</h3>
          <h4>Frasco 100 mL</h4>
          <h5>lavanda</h5>
          <p>Price: $10.00</p>
          
        </div>

        <div className='Produto'>
          <img src={prod2} alt="produto2" />
          <h3>Sabão em pasta</h3>
          <h4>Pote 350 g</h4>
          <p>Price: $20.00</p>


        </div>

        <div className='Produto'>
          <img src={prod3} alt="produto3" />
          <h3>Branqueador para roupas</h3>
          <h4>Embalagem zip 400 g</h4>
          <p>Price: $15.00</p>

        
        </div>

        <div className='Produto'>
          <img src={prod4} alt="produto4" />
          <h3>Limpa-vidros concentrado rende 500 mL </h3>
          <h4>Frasco 100 mL</h4>
          <p>Price: $10.00</p>
        
        </div>

        <div className='Produto'>
          <img src={prod5} alt="produto5" />
          <h3>Multiuso concentrado rende 500 mL</h3>
          <h4>Frasco 100 mL</h4>
          <h5>aroma suave</h5>
          <p>Price: $10.00</p> 

        </div>

        <div className='Produto'>
          <img src={prod6} alt="produto6" />
          <h3>Kit Pano encerado</h3>
          <h4>Contém 2 unidades P e M</h4>
          <h5>tecido 100% algodão, cera de abelha, breu e óleo de coco</h5>
          <p>Price: $10.00</p>

        </div>

        <div className='Produto'>
          <img src={prod7} alt="produto7" />
          <h3>Bucha vegetal</h3>
          <h4>Para limpeza geral e de louças</h4>
          <h5>1 unidade com alça</h5>
          <p>Price: $5.00</p>

        </div>

        <div className='Produto'>
          <img src={prod8} alt="produto8" />
          <h3>Consulte nossos Kits</h3>
          <h4>Fale conosco</h4>
        </div>

      </div>
      </div>
    </body>
  );
}

export default Produto;