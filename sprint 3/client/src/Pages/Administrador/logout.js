import Logouts from '../../Components/logouts/logout.js';
import NavbarP from '../../Components/navbar/navbarAdministrador.js';
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
            <NavbarP activeLink="/logout" />
            <Logouts />
        </>
    )
};

export default Logout;
