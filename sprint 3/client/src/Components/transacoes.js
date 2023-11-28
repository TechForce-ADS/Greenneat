import React, { useEffect, useState } from 'react';
import LogoQ from '../img/logoquad.png';
import { Formik, Form, Field } from 'formik';
import { FaUser, FaKiwiBird } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

function Coleta() {
  const [parceiro, setParceiro] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");

    fetch(`http://localhost:3001/perfil/${email}`)
      .then(response => response.json())
      .then(data => {
        console.log("Dados do perfil:", data);
        setParceiro(data);
      })
      .catch(error => console.error("Erro ao obter dados do perfil:", error));
  }, []);

  const handleClickColect = (values) => {
    axios.post("http://localhost:3001/realizarColeta", {
      nomeEstabelecimento: values.nomeEstabelecimento,
      quantidadeDeOleo: values.quantidadeDeOleo,
      tipoOleo: values.tipoOleo,
      ParceiroId: parceiro.id,
    })
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Coleta realizada com sucesso.',
        });
        console.log("Resposta do servidor:", response.data);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Erro ao realizar a coleta.',
        });
        console.error("Erro ao fazer a requisição:", error);
        if (error.response && error.response.data) {
          console.error("Mensagem de erro do servidor:", error.response.data.error);
        }
      });
  };

  return (
    <>
      <div className="transacaoBox">
        <img src={LogoQ} alt="LogoQ" className="logoQuadDivi" />
        <Formik
          initialValues={{
            nomeEstabelecimento: '',
            quantidadeDeOleo: '',
            tipoOleo: 'novo', // Valor padrão para o tipo de óleo
          }}
          onSubmit={handleClickColect}
        >
          <Form className="formLogin">
            <div className="inputWrapper">
              <i><FaUser /></i>
              <Field
                name="nomeEstabelecimento"
                placeholder="Estabelecimento"
                className="form-field"
              />
            </div>

            <div className="inputWrapper">
              <i><FaKiwiBird /></i>
              <Field
                name="quantidadeDeOleo"
                type="number"
                placeholder='quant. Óleo coletado'
                className="form-field"
              />
            </div>
            <div className="inputWrapper">
              <Field as="select" name="tipoOleo" className="form-field">
                <option value="novo">Óleo Virgem</option>
                <option value="usado">Óleo Usado</option>
              </Field>
            </div>
            <button type="submit">Coleta</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default Coleta;

