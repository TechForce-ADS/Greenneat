import NavbarE from '../../Components/navbar/navbarEstabelecimento.js';
import HistoricoEstabelecimento from '../../Components/historicoEstabelecimento.js'
import { useEffect } from 'react';

function HistoricoE() {

    useEffect(() => {
        // Verificar se há um usuário logado
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn ) {
          window.location.href = 'http://localhost:3000/';
        }
      }, []);
    


    return (
        <>
            <NavbarE activeLink="/historicoE" />
            <HistoricoEstabelecimento />
        </>
    )
};

export default HistoricoE;
