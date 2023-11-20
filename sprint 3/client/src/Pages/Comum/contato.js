import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/navbar/navbarC';

function Contato() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/enviar-email', formData);

      setFormSubmitted(true);
    } catch (error) {
      console.log('Ocorreu um erro ao enviar o formulário:', error);
    }
  };

  return (
    <>
      <Navbar activeLink="/contato" />
      <div className='confirmContainer'>
        {!formSubmitted ? (
          <div>
            <h2>Entre em contato</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="name">Nome:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="email">E-mail:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="message">Mensagem:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                ></textarea>
              </div>
              <button type="submit">Enviar</button>
            </form>
          </div>
        ) : (
          <div className='confirmContainer'>
            <h2>Formulário Enviado!</h2>
            <p>Obrigado por entrar em contato conosco.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Contato;
