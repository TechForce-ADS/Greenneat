import React, { useEffect, useState } from "react";

import { FaUserAlt  } from 'react-icons/fa';

function PerfilParceiro() {
    const [parceiro, setParceiro] = useState(null);

    useEffect(() => {
        const email = localStorage.getItem("email");

        fetch(`http://localhost:3001/perfil/${email}`)
            .then((response) => response.json())
            .then((data) => {
                setParceiro(data);
            })
            .catch((error) => console.error("Erro ao obter dados do perfil:", error));
    }, []);

    if (!parceiro) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="container">
            <div className="containerPerfil">
                <h1><FaUserAlt /></h1>
                <h2>Perfil do parceiro</h2>
                <ul>
                    <li>
                        <strong>Nome:</strong> {parceiro.nomeOrganizacao}
                    </li>
                    <li>
                        <strong>Email:</strong> {parceiro.email}
                    </li>
                    <li>
                        <strong>Endereço:</strong> {parceiro.endereco}
                    </li>
                    <li>
                        <strong>Cidade:</strong> {parceiro.cidade}
                    </li>
                    <li>
                        <strong>Horários de Funcionamento:</strong>{" "}
                        {parceiro.horariosFuncionamento}
                    </li>
                    <li>
                        <strong>Parceiros:</strong>{" "}
                        {parceiro.possuiParceiros ? "Sim" : "Não"}
                    </li>
                    <li>
                        <strong>Crédito:</strong> {parceiro.credito} Pontos
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default PerfilParceiro;