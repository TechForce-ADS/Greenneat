import NavbarP from '../../Components/navbar/navbarParceiro.js';
import PerfilParceiro from '../../Components/perfil/perfilParceiro';
import { useEffect } from 'react';



function Dados() {
    
    useEffect(() => {
        // Verificar se há um usuário logado
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn ) {
          window.location.href = 'http://localhost:3000/';
        }
      }, []);


    
    return (

        
        <>
            <NavbarP activeLink="/dados" />
            <PerfilParceiro />
        </>
    )
};

export default Dados;
