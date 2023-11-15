import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert';

function ListaParceiros() {
  const [parceiros, setParceiros] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parceiro, setParceiro] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedParceiro, setEditedParceiro] = useState(null);

  const excluirParceiro = async (id) => {
    Swal({
      title: 'Você tem certeza?',
      text: 'Esta ação não poderá ser revertida!',
      icon: 'warning',
      buttons: ['Cancelar', 'Excluir'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://localhost:3001/parceiro/${id}`);
          const updatedParceiros = parceiros.filter((parceiro) => parceiro.id !== id);
          setParceiros(updatedParceiros);
        } catch (error) {
          console.error('Erro ao excluir parceiro:', error);
        }
      }
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3001/parceiros`);
        setParceiros(response.data);
      } catch (error) {
        console.error('Erro ao buscar parceiros:', error);
      }
    }
    fetchData();
  }, []);

  const pesquisaParceiro = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/parceiro/${id}`);
      setParceiro(response.data);
    } catch (error) {
      console.error('Erro ao buscar informações do parceiro:', error);
    }
  };

  const openModal = (id) => {
    pesquisaParceiro(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = (id) => {
    pesquisaParceiro(id);
    setEditedParceiro(parceiro); // Defina editedParceiro com os dados do parceiro para edição
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setEditedParceiro(null);
  };

  const handleEditChange = (e) => {
    const { id, value } = e.target;
    setEditedParceiro({
      ...editedParceiro,
      [id]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/parceiro/${editedParceiro.id}`, editedParceiro);
      const response = await axios.get(`http://localhost:3001/parceiros`);
      setParceiros(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao editar parceiro:', error);
    }
  };

  const formatarData = (dataOriginal) => {
    const data = new Date(dataOriginal);
    const ano = data.getFullYear();
    const mes = ('0' + (data.getMonth() + 1)).slice(-2);
    const dia = ('0' + data.getDate()).slice(-2);
    return `${dia}-${mes}-${ano}`;
  };

  return (
    <>
      <table id="table-parceiro" className='hide'>
        <thead>
          <tr>
            <th>Criado Em</th>
            <th>Alterado Em</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Endereço</th>
            <th>Cidade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {parceiros.map((parceiro) => (
            <tr key={parceiro.id}>
              <td>{formatarData(parceiro.createdAt)}</td>
              <td>{formatarData(parceiro.updatedAt)}</td>
              <td>{parceiro.nomeOrganizacao}</td>
              <td>{parceiro.email}</td>
              <td>{parceiro.endereco}</td>
              <td>{parceiro.cidade}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <FaEye title='Visualizar' onClick={() => openModal(parceiro.id)} style={{ cursor: 'pointer', margin: '10px' }}/>
                  <FaEdit title='Editar' onClick={() => openEditModal(parceiro.id)} style={{ cursor: 'pointer', margin: '10px' }} />
                  <FaTrash title='Excluir' onClick={() => excluirParceiro(parceiro.id)} style={{ cursor: 'pointer', margin: '10px' }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {isModalOpen && (
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h2>Parceiro</h2>
              {parceiro && (
                <div className='modal-adm'>
                  <p><b>ID do parceiro:</b> {parceiro.id}</p>
                  <p><b>Nome da organização:</b> {parceiro.nomeOrganizacao}</p>
                  <p><b>E-mail:</b> {parceiro.email}</p>
                  <p><b>Endereço:</b> {parceiro.endereco}</p>
                  <p><b>Cidade:</b> {parceiro.cidade}</p>
                  <p><b>Criado Em:</b> {formatarData(parceiro.createdAt)}</p>
                  <p><b>Alterado Em:</b> {formatarData(parceiro.updatedAt)}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {isEditing && (
          <div id="editModal" className="modalEditarGestao">
            <div className="modal-content-gestao">
              <span className="close" onClick={closeEditModal}>&times;</span>
              <h2>Editar Parceiro</h2>
              {editedParceiro && (
                <form onSubmit={handleEditSubmit}>
                  <label htmlFor="nomeOrganizacao">Nome da Organização:</label>
                  <input
                    type="text"
                    id="nomeOrganizacao"
                    value={editedParceiro.nomeOrganizacao}
                    onChange={handleEditChange}
                  />
                  <label htmlFor="email">E-mail:</label>
                  <input
                    type="text"
                    id="email"
                    value={editedParceiro.email}
                    onChange={handleEditChange}
                  />
                  <label htmlFor="endereco">Endereço:</label>
                  <input
                    type="text"
                    id="endereco"
                    value={editedParceiro.endereco}
                    onChange={handleEditChange}
                  />
                  <label htmlFor="cidade">Cidade:</label>
                  <input
                    type="text"
                    id="cidade"
                    value={editedParceiro.cidade}
                    onChange={handleEditChange}
                  />
                  <button type="submit">Salvar</button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ListaParceiros;
