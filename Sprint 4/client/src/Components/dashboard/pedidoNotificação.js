import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Pedidos() {
    const [usuarios, setUsuarios] = useState([]); // Adicionando o estado para armazenar os nomes dos usuários

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:3001/historicoComprasADM`);
                console.log('Response from backend:', response.data);

                // Extrai os nomes dos usuários das compras
                const usuarios = response.data.map(compra => compra.nomeOrganizacao);
                
                // Mostra apenas os últimos 3 nomes de usuários
                const ultimosUsuarios = usuarios.slice(-5);
                setUsuarios(ultimosUsuarios);
            } catch (error) {
                console.error('Erro ao buscar as compras:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
        
            <div >
                <ul>
                    {usuarios.map((usuario) => (
                        <p><b> COMPRA - </b>{usuario}</p>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Pedidos;
