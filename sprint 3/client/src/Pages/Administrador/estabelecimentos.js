import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert';

function ListaEstabelecimentos() {
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [estabelecimento, setEstabelecimento] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEstabelecimento, setEditedEstabelecimento] = useState(null);

  const excluirEstabelecimento = async (id) => {
    Swal({
      title: 'Você tem certeza?',
      text: 'Esta ação não poderá ser revertida!',
      icon: 'warning',
      buttons: ['Cancelar', 'Excluir'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`http://localhost:3001/estabelecimento/${id}`);
          const updatedEstabelecimentos = estabelecimentos.filter((estabelecimento) => estabelecimento.id !== id);
          setEstabelecimentos(updatedEstabelecimentos);
        } catch (error) {
          console.error('Erro ao excluir estabelecimento:', error);
        }
      }
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:3001/estabelecimentos`);
        setEstabelecimentos(response.data);
      } catch (error) {
        console.error('Erro ao buscar estabelecimentos:', error);
      }
    }
    fetchData();
  }, []);

  const pesquisaEstabelecimento = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/estabelecimento/${id}`);
      setEstabelecimento(response.data);
    } catch (error) {
      console.error('Erro ao buscar informações do estabelecimento:', error);
    }
  };

  const openModal = (id) => {
    pesquisaEstabelecimento(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = async (id) => {
    try {
      // Fetch data
      const response = await axios.get(`http://localhost:3001/estabelecimento/${id}`);
      // Set the data to editedEstabelecimento
      setEditedEstabelecimento(response.data);
      // Open the edit modal
      setIsEditing(true);
    } catch (error) {
      console.error('Erro ao buscar informações do estabelecimento:', error);
    }
  };
  

  const closeEditModal = () => {
    setIsEditing(false);
    setEditedEstabelecimento(null);
  };

  const handleEditChange = (e) => {
    const { id, value } = e.target;
    setEditedEstabelecimento({
      ...editedEstabelecimento,
      [id]: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/estabelecimento/${editedEstabelecimento.id}`, editedEstabelecimento);
      // Após a edição, você pode recarregar os dados para atualizar a lista
      const response = await axios.get(`http://localhost:3001/estabelecimentos`);
      setEstabelecimentos(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao editar estabelecimento:', error);
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
      <table id="table-estabelecimento" className='hide'>
        <thead>
          <tr>
            <th>Criado Em</th>
            <th>Alterado Em</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Endereço</th>
            <th>Cidade</th>
            <th>Horários</th>
            <th>Crédito</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {estabelecimentos.map((estabelecimento) => (
            <tr key={estabelecimento.id}>
              <td>{formatarData(estabelecimento.createdAt)}</td>
              <td>{formatarData(estabelecimento.updatedAt)}</td>
              <td>{estabelecimento.nomeOrganizacao}</td>
              <td>{estabelecimento.email}</td>
              <td>{estabelecimento.endereco}</td>
              <td>{estabelecimento.cidade}</td>
              <td>{estabelecimento.horariosFuncionamento}</td>
              <td>{estabelecimento.credito}</td>
      
              <td>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <FaEye title='Visualizar' onClick={() => openModal(estabelecimento.id)} style={{ cursor: 'pointer', margin: '10px' }} />
                  <FaEdit title='Editar' onClick={() => openEditModal(estabelecimento.id)} style={{ cursor: 'pointer', margin: '10px' }}  />
                  <FaTrash title='Excluir' onClick={() => excluirEstabelecimento(estabelecimento.id)} style={{ cursor: 'pointer', margin: '10px' }}  />
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
              <h2>Estabelecimento</h2>
              {estabelecimento && (
                <div className='modal-adm'>
                  <p><b>ID do estabelecimento:</b> {estabelecimento.id}</p>
                  <p><b>Nome da organização:</b> {estabelecimento.nomeOrganizacao}</p>
                  <p><b>E-mail:</b> {estabelecimento.email}</p>
                  <p><b>Endereço:</b> {estabelecimento.endereco}</p>
                  <p><b>Cidade:</b> {estabelecimento.cidade}</p>
                  <p><b>Criado Em:</b> {formatarData(estabelecimento.createdAt)}</p>
                  <p><b>Alterado Em:</b> {formatarData(estabelecimento.updatedAt)}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {isEditing && (
          <div id="editModal" className="modalEditarGestao">
            <div className="modal-content-gestao">
              <span className="close" onClick={closeEditModal}>&times;</span>
              <h2>Editar Estabelecimento</h2>
              {editedEstabelecimento && (
                <form onSubmit={handleEditSubmit}>
                  <label htmlFor="nomeOrganizacao">Nome da Organização:</label>
                  <input
                    type="text"
                    id="nomeOrganizacao"
                    value={editedEstabelecimento.nomeOrganizacao}
                    onChange={handleEditChange}
                  />
                  <label htmlFor="email">E-mail:</label>
                  <input
                    type="text"
                    id="email"
                    value={editedEstabelecimento.email}
                    onChange={handleEditChange}
                  />
                  <label htmlFor="endereco">Endereço:</label>
                  <input
                    type="text"
                    id="endereco"
                    value={editedEstabelecimento.endereco}
                    onChange={handleEditChange}
                  />
                  <label htmlFor="cidade">Cidade:</label>
                  <input
                    type="text"
                    id="cidade"
                    value={editedEstabelecimento.cidade}
                    onChange={handleEditChange}
                  />
                  <label htmlFor="horariosFuncionamento">Horários de Funcionamento:</label>
                  <input
                    type="text"
                    id="horariosFuncionamento"
                    value={editedEstabelecimento.horariosFuncionamento}
                    onChange={handleEditChange}
                  />
                  <label htmlFor="credito">Crédito:</label>
                  <input
                    type="text"
                    id="credito"
                    value={editedEstabelecimento.credito}
                    onChange={handleEditChange}
                  />
                  <label htmlFor="possuiParceiros">Possui Parceiros:</label>
                  <input
                    type="text"
                    id="possuiParceiros"
                    value={editedEstabelecimento.possuiParceiros}
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

export default ListaEstabelecimentos;
