import NavbarP from '../../Components/navbar/navbarParceiro';
import React, { useEffect} from 'react';
import VincularEstabelecimento from '../../Components/Carteira/vincular';
import Tabela from '../../Components/Carteira/vinculos';
import Administrar from '../../Components/Carteira/carteira';
 


function Carteira() {


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
            <Administrar />

          </div>
      </>
  )
};

export default Carteira;
