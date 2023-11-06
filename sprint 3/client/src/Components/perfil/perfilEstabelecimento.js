import React, { useEffect, useState } from "react";
import { FaStoreAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

function PerfilEstabelecimento() {
    const [estabelecimento, setEstabelecimento] = useState(null);
    const [formData, setFormData] = useState({
        nomeOrganizacao: "",
        email: "",
        endereco: "",
        cidade: "",
        horariosFuncionamento: "",
        possuiParceiros: false // Default value, assuming a boolean
    });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem("email");

        fetch(`http://localhost:3001/perfil/${email}`)
            .then((response) => response.json())
            .then((data) => {
                setEstabelecimento(data);
                setFormData(data); 
            })
            .catch((error) => console.error("Erro ao obter dados do perfil:", error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = estabelecimento.id; // Assuming the ID is available in the fetched data

        fetch(`http://localhost:3001/editarEstabelecimento/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => {
            // Handle success message or update state if needed
            console.log(data.message); // Log success message
            
            // Exibir o modal de sucesso
            showSuccessModal();
        })
        .catch((error) => {
            // Handle error
            console.error("Erro ao atualizar estabelecimento:", error);
        });
    };

    const showSuccessModal = () => {
        Swal.fire({
            icon: 'success',
            title: 'Perfil atualizado com sucesso!',
            showConfirmButton: false,
            timer: 1500
        });
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

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
                        <strong>Nome:</strong> {estabelecimento.nomeOrganizacao}
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
                        <strong>Parceiros:</strong>{" "}
                        {estabelecimento.possuiParceiros ? "Sim" : "Não"}
                    </li>
                    <li>
                        <strong>Crédito:</strong> {estabelecimento.credito} Pontos
                    </li>
                </ul>

                {/* Botão para abrir o modal */}
                <button id="botaoEditar" onClick={openModal}>Editar</button>

                {/* Modal */}
                {showModal && (
                    <div className="modalEditar">
                        <div className="modalContent">
                            <span className="close" onClick={closeModal}>
                                &times;
                            </span>
                            <h2 className="editarTitulo">Editar Informações</h2>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="nomeOrganizacao">Nome da Organização:</label>
                                <input
                                    type="text"
                                    name="nomeOrganizacao"
                                    value={formData.nomeOrganizacao}
                                    onChange={handleChange}
                                />
                                <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                                <label htmlFor="endereco">Endereço:</label>
                                <input
                                    type="text"
                                    name="endereco"
                                    value={formData.endereco}
                                    onChange={handleChange}
                                />
                                <label htmlFor="cidade">Cidade:</label>
                                <input
                                    type="text"
                                    name="cidade"
                                    value={formData.cidade}
                                    onChange={handleChange}
                                />
                                <label htmlFor="horariosFuncionamento">Horário de Funcionamento:</label>
                                <input
                                    type="text"
                                    name="horariosFuncionamento"
                                    value={formData.horariosFuncionamento}
                                    onChange={handleChange}
                                />
                                <label htmlFor="possuiParceiros">Possui Parceiros:</label>
                                <input
                                    type="text"
                                    name="possuiParceiros"
                                    value={formData.possuiParceiros}
                                    onChange={handleChange}
                                />
                                <button id ="botaoEditar" type="submit">Salvar Alterações</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PerfilEstabelecimento;
