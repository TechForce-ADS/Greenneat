import NavbarE from '../../Components/navbar/navbarEstabelecimento.js';
import PerfilEstabelecimento from '../../Components/perfil/perfilEstabelecimento.js'
import { useEffect } from 'react';


function DadosE() {

    useEffect(() => {
        // Verificar se há um usuário logado
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn ) {
          window.location.href = 'http://localhost:3000/';
        }
      }, []);



    return (
        <>
            <NavbarE activeLink="/dadosE" />
            <PerfilEstabelecimento />
        </>
    )
};

export default DadosE;
