import React, { useEffect, useState } from 'react';
import LogoQ from '../img/logoquad.png';
import { Formik, Form, Field } from 'formik';
import { FaUser, FaKiwiBird  } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';






function Coleta() {
  const [parceiro, setParceiro] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("email");

    // Faça uma requisição GET para a rota de perfil no seu backend
    fetch(`http://localhost:3001/perfil/${email}`)
      .then(response => response.json())
      .then(data => {
        console.log("Dados do perfil:", data);
        // Atualize o estado do parceiro com os dados obtidos
        setParceiro(data);
      })
      .catch(error => console.error("Erro ao obter dados do perfil:", error));
  }, []);  // Certifique-se de passar um array vazio para garantir que esta chamada ocorra apenas uma vez


  
const handleClickColect = (values) => {
  axios.post("http://localhost:3001/realizarColeta", {
    nomeEstabelecimento: values.nomeEstabelecimento,
    quantidadeDeOleo: values.quantidadeDeOleo,
    ParceiroId: parceiro.id,
  })
    .then(response => {
      // Exibe um pop-up de sucesso
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Coleta realizada com sucesso.',
      });
      console.log("Resposta do servidor:", response.data);
    })
    .catch(error => {
      // Exibe um pop-up de erro
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
      <div className="boxDivisao">
        <img src={LogoQ} alt="LogoQ" className="logoQuadDivi" />
        <Formik
          initialValues={{
            nomeEstabelecimento: '', // inicialize com uma string vazia
            quantidadeDeOleo: '' // inicialize com uma string vazia
          }}
          onSubmit={handleClickColect}
        >
          <Form className="formLogin">
            <div className="inputWrapper">
              <i><FaUser /></i>
              <Field
                name="nomeEstabelecimento"
                placeholder='Estabelecimento'
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
            <button type="submit">Coleta</button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default Coleta;
