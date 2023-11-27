import React, { useState, useEffect } from 'react';
import NavbarE from '../../Components/navbar/navbarEstabelecimento';
import prod1 from '../../img/oleo1.png';
import prod2 from '../../img/sabao.png';
import prod3 from '../../img/branqueador.png';
import prod4 from '../../img/limpav.png';
import prod5 from '../../img/olao2.png';
import prod6 from '../../img/pano.png';
import prod7 from '../../img/bucha.png';
import prod8 from '../../img/kits.png';
import axios from 'axios';
import Swal from 'sweetalert2';

function Produto() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartNotification, setCartNotification] = useState(null);
  const [estabelecimento, setEstabelecimento] = useState(null);

  useEffect(() => {
    // Verificar se há um usuário logado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      window.location.href = 'http://localhost:3000/';
    }
  }, []);



  const showNotification = (productName, quantity) => {
    setCartNotification(`${quantity}x ${productName} foi adicionado ao carrinho!`);
    setTimeout(() => {
      setCartNotification(null);
    }, 3000);
  };

  const addToCart = (productName, price) => {
    const existingCartItemIndex = cart.findIndex(item => item.productName === productName);

    let updatedCart;
    let updatedQuantity = 1;  // Default quantity is 1

    if (existingCartItemIndex !== -1) {
      updatedCart = cart.map((item, index) => {
        if (index === existingCartItemIndex) {
          updatedQuantity = item.quantity + 1; // Update the quantity
          return {
            ...item,
            quantity: updatedQuantity
          };
        }
        return item;
      });
    } else {
      updatedCart = [...cart, { productName, price, quantity: updatedQuantity }];
    }

    setCart(updatedCart);
    showNotification(productName, updatedQuantity); // Pass the correct quantity to showNotification
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const email = localStorage.getItem("email");

    fetch(`http://localhost:3001/perfil/${email}`)
      .then(response => response.json())
      .then(data => {
        setEstabelecimento(data);
      })
      .catch(error => console.error("Erro ao obter dados do perfil:", error));
  }, []);





  const handleCheckout = async () => {
    try {
      if (!estabelecimento || !estabelecimento.id) {
        throw new Error('Estabelecimento não selecionado.');
      }

      const produtos = cart.map(item => ({
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
      }));

      const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

      const response = await axios.post('http://localhost:3001/realizarCompra', {
        produtos,
        total,
        EstabelecimentoId: estabelecimento.id,
        tipo: "estabelecimento"
      });

      console.log('Pedido processado com sucesso:', response.data);

      // Atualiza o número de compras localmente
      setEstabelecimento(prevEstabelecimento => ({ ...prevEstabelecimento, compras: prevEstabelecimento.compras + 1 }));

      // Exibe um pop-up de sucesso após a compra bem-sucedida
      Swal.fire({
        icon: 'success',
        title: 'Compra realizada com sucesso!',
        text: 'A compra foi realizada com sucesso.',
        showConfirmButton: true
      });

      closeModal();
      setCart([]); // Limpa o carrinho após a compra bem-sucedida
    } catch (error) {
      console.error('Erro ao processar o pedido:', error);

      // Exibe um pop-up de erro em caso de falha no processamento do pedido
      Swal.fire({
        icon: 'error',
        title: 'Erro ao processar o pedido',
        text: 'Não há saldo disponível para a transação.',
        showConfirmButton: true
      });
    }
  };





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
            <p>Preço: R$10.00</p>
            <button onClick={() => addToCart('Multiuso concentrado (lavanda)', 10.00)}>Add to Cart</button>
          </div>

          <div className='Produto'>
            <img src={prod2} alt="produto2" />
            <h3>Sabão em pasta</h3>
            <h4>Pote 350 g</h4>
            <p>Preço: R$20.00</p>

            <button onClick={() => addToCart('Sabão em pasta', 20.00)}>Add to Cart</button>
          </div>

          <div className='Produto'>
            <img src={prod3} alt="produto3" />
            <h3>Branqueador para roupas</h3>
            <h4>Embalagem zip 400 g</h4>
            <p>Preço: R$15.00</p>

            <button onClick={() => addToCart('Branqueador para roupas', 15.00)}>Add to Cart</button>
          </div>

          <div className='Produto'>
            <img src={prod4} alt="produto4" />
            <h3>Limpa-vidros concentrado rende 500 mL </h3>
            <h4>Frasco 100 mL</h4>
            <p>Preço: R$10.00</p>
            <button onClick={() => addToCart('Limpa-vidros concentrado', 10.00)}>Add to Cart</button>
          </div>

          <div className='Produto'>
            <img src={prod5} alt="produto5" />
            <h3>Multiuso concentrado rende 500 mL</h3>
            <h4>Frasco 100 mL</h4>
            <h5>aroma suave</h5>
            <p>Preço: R$10.00</p>
            <button onClick={() => addToCart('Multiuso concentrado (aroma suave)', 10.00)}>Add to Cart</button>
          </div>

          <div className='Produto'>
            <img src={prod6} alt="produto6" />
            <h3>Kit Pano encerado</h3>
            <h4>Contém 2 unidades P e M</h4>
            <h5>tecido 100% algodão, cera de abelha, breu e óleo de coco</h5>
            <p>Preço: R$10.00</p>
            <button onClick={() => addToCart('Kit Pano encerado', 10.00)}>Add to Cart</button>
          </div>

          <div className='Produto'>
            <img src={prod7} alt="produto7" />
            <h3>Bucha vegetal</h3>
            <h4>Para limpeza geral e de louças</h4>
            <h5>1 unidade com alça</h5>
            <p>Preço: R$5.00</p>
            <button onClick={() => addToCart('Bucha vegetal', 5.00)}>Add to Cart</button>
          </div>

          <div className='Produto'>
            <img src={prod8} alt="produto8" />
            <h3>Consulte nossos Kits</h3>
            <h4>Fale conosco</h4>
          </div>

        </div>


        <div>
          <button className='carrinho'
            onClick={openModal}
            disabled={cart.length === 0} >
            Carrinho
          </button>

          {cartNotification && (
            <div className="notification">
              {cartNotification}
            </div>
          )}
          {isModalOpen && (
            <div id="myModal" className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Carrinho</h2>
                <ul>
                  {cart.map((item, index) => (
                    <li key={index}>
                      {item.productName} - ${item.price.toFixed(2)} - Quantidade: {item.quantity}X
                    </li>
                  ))}
                </ul>
                <p>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                <button className='checkout-button' onClick={handleCheckout}>Finalizar Compra</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </body>
  );
}

export default Produto;