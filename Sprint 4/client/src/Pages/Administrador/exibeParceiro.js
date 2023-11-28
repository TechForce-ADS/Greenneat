import React, { useState, useEffect } from 'react';

const ExibeParceiroModal = ({ isOpen, onClose }) => {


    useEffect(() => {
        // Verificar se há um usuário logado
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const adm = localStorage.getItem('adm');
        
        if (!isLoggedIn || !adm) {
          window.location.href = 'http://localhost:3000/';
        }
      }, []);
      


    return (
        isOpen && (
            <div className="modal">
                <div className="modal-content modal-informacoes">
                    <div className='d-flex-between'>
                        <h2><b>Informações do Parceiro</b></h2>
                        <span className="close" onClick={onClose}>&times;</span>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="nome">Nome:</label>
                            <input type="text" id="nome" className="field-modal" readOnly />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="text" id="email" className="field-modal" readOnly />
                        </div>

                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="endereco">Endereço:</label>
                                <input type="text" id="endereco" className="field-modal" readOnly />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="cidade">Cidade:</label>
                                <input type="text" id="cidade" className="field-modal" readOnly />
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="criadoEm">Criado em:</label>
                                <input type="text" id="criadoEm" className="field-modal" readOnly />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="alteradoEm">Alterado em:</label>
                                <input type="text" id="alteradoEm" className="field-modal" readOnly />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

const Modal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <ExibeParceiroModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default Modal;
