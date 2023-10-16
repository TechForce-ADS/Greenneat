import React, { useEffect, useState } from "react";

import { FaStoreAlt  } from 'react-icons/fa';

function PerfilEstabelecimento() {
    const [estabelecimento, setEstabelecimento] = useState(null);

    useEffect(() => {
        const email = localStorage.getItem("email");

        fetch(`http://localhost:3001/perfil/${email}`)
            .then((response) => response.json())
            .then((data) => {
                setEstabelecimento(data);
            })
            .catch((error) => console.error("Erro ao obter dados do perfil:", error));
    }, []);

    if (!estabelecimento) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="container">
            <div className="containerPerfil">
                <h1><FaStoreAlt /></h1>
                <h2>Perfil do Estabelecimento</h2>
                <ul>
                    <li>
                        <strong>Nome da Organização:</strong> {estabelecimento.nomeOrganizacao}
                    </li>
                    <li>
                        <strong>Email:</strong> {estabelecimento.email}
                    </li>
                    <li>
                        <strong>Endereço:</strong> {estabelecimento.endereco}
                    </li>
                    <li>
                        <strong>Cidade:</strong> {estabelecimento.cidade}
                    </li>
                    <li>
                        <strong>Horários de Funcionamento:</strong>{" "}
                        {estabelecimento.horariosFuncionamento}
                    </li>
                    <li>
                        <strong>Possui Parceiros:</strong>{" "}
                        {estabelecimento.possuiParceiros ? "Sim" : "Não"}
                    </li>
                    <li>
                        <strong>Crédito:</strong> {estabelecimento.credito} Pontos
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default PerfilEstabelecimento;