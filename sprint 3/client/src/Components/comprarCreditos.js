import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LogoQ from '../img/logoquad.png';
import { FaKiwiBird } from 'react-icons/fa';
import { Formik, Form, Field } from 'formik';

function ComprarCreditos() {
  const [credito, setCredito] = useState('');

  const handleClickAdicionarCredito = () => {
    axios.post("http://localhost:3001/comprarCredito", {
      email: localStorage.email,
      credito: parseFloat(credito),
    })
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Crédito adicionado com sucesso.',
        });
        console.log("Resposta do servidor:", response.data);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Erro ao adicionar crédito.',
        });
        console.error("Erro ao fazer a requisição:", error);
        if (error.response && error.response.data) {
          console.error("Mensagem de erro do servidor:", error.response.data.error);
        }
      });
  };

  return (
    <>
      <div className="boxDivisao">
        <img src={LogoQ} alt="LogoQ" className="logoQuadDivi" />
        <h2>Comprar Créditos</h2>
        <h4> Total R${(credito * 1.29).toFixed(2)} </h4>
        <Formik
          initialValues={{
            quantidadeCreditos: ''
          }}
          onSubmit={handleClickAdicionarCredito}
        >
          <Form className="formLogin">
            <div className="inputWrapper">
              <i><FaKiwiBird /></i>
              <Field
                 name="quantidadeCreditos" 
                type="number"
                placeholder='Credito'
                className="form-field"
                value={credito}
                onChange={(e) => setCredito(e.target.value)}
              />
            </div>
            <button type="button" onClick={handleClickAdicionarCredito}>Adicionar Crédito</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default ComprarCreditos;