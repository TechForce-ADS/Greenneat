import NavbarP from '../../Components/navbar/navbarAdministrador';
import React, { useEffect} from 'react';
import VincularEstabelecimento from '../../Components/Carteira/vincular';
import Tabela from '../../Components/Carteira/vinculos';
import Carteira from '../../Components/Carteira/carteira';
 

//EU USO ESSA TELA PARA TESTE
//NÃO DELETE ELA

function Comparador() {


  useEffect(() => {
      // Verificar se há um usuário logado
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (!isLoggedIn ) {
        window.location.href = 'http://localhost:3000/';
      }
    }, []);



  return (
      <>
          <NavbarP activeLink="/carteira" />
          <div className='containerLogin'>
            <VincularEstabelecimento />
            <Tabela />
            <Carteira />

          </div>
      </>
  )
};

export default Comparador;
