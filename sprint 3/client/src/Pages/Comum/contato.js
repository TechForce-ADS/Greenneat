import React, { useState } from 'react';
import Navbar from '../../Components/navbar/navbarC';

function Contato() {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleEnviarEmail = () => {
    const emailDestino = 'contatogreenneat@gmail.com';
    const assunto = 'Contato pelo site';
    const corpoEmail = `Nome: ${nome}\n\nMensagem: ${mensagem}`;
    const link = `mailto:${emailDestino}?subject=${assunto}&body=${encodeURIComponent(corpoEmail)}`;
    window.location.href = link;
  };

  return (
    <>
      <Navbar />
      <div className='contTitulo'>
        <h1>Contato</h1>
      </div>
      <div className="ContContent">
        <div className="contato-input">
          <div className="contato-text">
            <h2 id="formulario"> Quer entrar em contato conosco?</h2>
          </div>
          <span>
            <label>
              <h3> Digite seu nome Completo: </h3>
            </label>
            <input type="text" placeholder="" value={nome} onChange={(e) => setNome(e.target.value)}></input>
          </span>
          <span>
            <label>
              <h3>Escreva sua Mensagem: </h3>
            </label>
            <textarea placeholder="Digite sua mensagem..." value={mensagem} onChange={(e) => setMensagem(e.target.value)}></textarea>
          </span>
          <button className="btn-contact" onClick={handleEnviarEmail}>Enviar</button>
        </div>
        <div className="contato-text"></div>
      </div>
    </>
  )
}

export default Contato;
