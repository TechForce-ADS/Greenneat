import Logouts from '../../Components/logouts/logout.js';
import NavbarE from '../../Components/navbar/navbarEstabelecimento.js';
import { useEffect } from 'react';




function Logout() {

    useEffect(() => {
        // Verificar se há um usuário logado
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn ) {
          window.location.href = 'http://localhost:3000/';
        }
      }, []);


    return (
        <>
            <NavbarE activeLink="/logoutE" />
            <Logouts />
        </>
    )
};

export default Logout;
