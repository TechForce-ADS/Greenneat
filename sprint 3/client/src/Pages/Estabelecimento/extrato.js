import NavbarE from '../../Components/navbar/navbarEstabelecimento.js';
import ExtratoEstabelecimento from '../../Components/extratoEstabelecimento.js';
import { useEffect } from 'react';



function ExtratoE() {

    useEffect(() => {
        // Verificar se há um usuário logado
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn ) {
          window.location.href = 'http://localhost:3000/';
        }
      }, []);


    return (
        <>
            <NavbarE activeLink="/extratoE" />
            <ExtratoEstabelecimento />
        </>
    )
};

export default ExtratoE;