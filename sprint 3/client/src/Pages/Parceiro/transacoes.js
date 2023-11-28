import NavbarP from '../../Components/navbar/navbarParceiro.js';
import Coleta from '../../Components/transacoes.js';
import { useEffect } from 'react';



function Transacoes() {

    useEffect(() => {
        // Verificar se há um usuário logado
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn ) {
          window.location.href = 'http://localhost:3000/';
        }
      }, []);


    return (
        <>
            <NavbarP activeLink="/transacoes" />
            <div className='containerLogin'>
                <Coleta />
            </div>
        </>
    )
};

export default Transacoes;
