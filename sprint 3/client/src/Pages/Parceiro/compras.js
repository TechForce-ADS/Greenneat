import NavbarE from '../../Components/navbar/navbarParceiro.js';
import HistoricoComprasParceiro from '../../Components/HistComprasParceiro.js';
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
            <NavbarE activeLink="/Compras" />
            <HistoricoComprasParceiro />
        </>
    )
};

export default ExtratoE;
