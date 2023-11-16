import NavbarP from '../../Components/navbar/navbarParceiro.js';
import React, { useEffect, useState } from "react";
import { FaUserAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';


function Dados() {

  useEffect(() => {
    // Verificar se há um usuário logado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      window.location.href = 'http://localhost:3000/';
    }
  }, []);

  const [parceiro, setParceiro] = useState(null);
  const [formData, setFormData] = useState({

  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");

    fetch(`http://localhost:3001/perfil/${email}`)
      .then((response) => response.json())
      .then((data) => {
        setParceiro(data);
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
    const id = parceiro.id; 

    fetch(`http://localhost:3001/editarParceiro/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
    
        console.log(data.message); 
        Swal.fire({
          icon: 'success',
          title: 'Perfil atualizado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((error) => {
        console.error("Erro ao atualizar parceiro:", error);
      });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (!parceiro) {
    return <div>Carregando...</div>;
  }

  return (




    <>
      <NavbarP activeLink="/dados" />

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
                  <button id="botaoEditar" type="submit">Salvar Alterações</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  )
};

export default Dados;
