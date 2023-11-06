import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';

function ListaParceiros() {
    const [parceiros, setParceiros] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [parceiro, setParceiro] = useState(null);

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
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao buscar informações do parceiro:', error);
        }
    };


    if (parceiros.length === 0) {
        return <h1 id="table-parceiro" className='hide'>Nenhum parceiro encontrado.</h1>;
    }

    const openModal = (id) => {
        pesquisaParceiro(id);
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
                        <tr>
                            <td>{formatarData(parceiro.createdAt)}</td>
                            <td>{formatarData(parceiro.updatedAt)}</td>
                            <td>{parceiro.nomeOrganizacao}</td>
                            <td>{parceiro.email}</td>
                            <td>{parceiro.endereco}</td>
                            <td>{parceiro.cidade}</td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                                    <FaEye title='Visualizar' onClick={() => openModal(parceiro.id)} />
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
            </div>
        </>

    );
}


export default ListaParceiros;
