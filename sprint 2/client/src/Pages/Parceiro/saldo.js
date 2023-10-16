import NavbarP from '../../Components/navbar/navbarParceiro.js';
import { useEffect } from 'react';

function Saldo() {

    useEffect(() => {
        // Verificar se há um usuário logado
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn ) {
          window.location.href = 'http://localhost:3000/';
        }
      }, []);

    return (
        <>
            <NavbarP activeLink="/saldo" />
        </>
    )
};

export default Saldo;
