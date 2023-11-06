import NavbarE from '../../Components/navbar/navbarEstabelecimento.js';
import HistoricoCompras from '../../Components/HistCompras.js';
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
            <HistoricoCompras />
        </>
    )
};

export default ExtratoE;
