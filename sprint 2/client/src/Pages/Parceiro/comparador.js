import NavbarP from '../../Components/navbar/navbarParceiro.js';
import { useEffect } from 'react';


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
            <NavbarP activeLink="/comparador" />
        </>
    )
};

export default Comparador;
