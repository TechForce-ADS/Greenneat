import NavbarP from '../../Components/navbar/navbarParceiro.js';
import Transacoes from '../../Components/historicoCredito.js';
import { useEffect } from 'react';




function HistoricoCredito() {

    useEffect(() => {
        // Verificar se há um usuário logado
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn ) {
          window.location.href = 'http://localhost:3000/';
        }
      }, []);

      
    return (
        <>
            <NavbarP activeLink="/historicoCredito" />
            <Transacoes />
        </>
    )
};

export default HistoricoCredito;
