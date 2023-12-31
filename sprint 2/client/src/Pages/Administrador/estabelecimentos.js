import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';

function ListaEstabelecimentos() {
    const [estabelecimentos, setEstabelecimentos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [estabelecimento, setEstabelecimento] = useState(null);


   


    
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
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao buscar informações do estabelecimento:', error);
        }
    };

    if (estabelecimentos.length === 0) {
        return <h1 id='table-estabelecimento' className='hide'>Nenhum estabelecimento encontrado.</h1>;
    }

    const openModal = (id) => {
        pesquisaEstabelecimento(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                        <th>Possui Parceiros</th>
                        <th></th>
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
                            <td>{estabelecimento.possuiParceiros}</td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <FaEye title='Visualizar'  onClick={() => openModal(estabelecimento.id)} />
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
                                    <p><b>ID do estabelecimento   :</b> {estabelecimento.id}</p>
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

                
            </div>
        </>
    );
}


export default ListaEstabelecimentos;

