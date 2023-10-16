import React from 'react';
import LogoQ from '../../img/logoquad.png';
import { FaUser, FaLock } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Swal from 'sweetalert2';
import axios from 'axios';


function saveLoginData(email, senha) {
  localStorage.setItem('email', email);
  localStorage.setItem('senha', senha);
}


function ShowDivisao() {
  let formLoginParceiro = document.querySelector('#boxLoginParceiro');
  let Divisao = document.querySelector('#divisao');
  formLoginParceiro.classList.add('hide')
  Divisao.classList.remove('hide')

}

const handleClickLoginParceiro = (values) => {
  axios.post('http://localhost:3001/loginParceiro', {
      email: values.email,
      senha: values.senha,
  })
  .then((response) => {
      Swal.fire({
          icon: 'success',
          title: 'Login efetuado com sucesso!',
          showConfirmButton: false,
          timer: 1500
      }).then(() => {
          // Isso abaixo só acontece após o pop-up fechar
          
          localStorage.setItem('isLoggedIn', true);
          saveLoginData(values.email, values.senha);
          window.location.href = 'http://localhost:3000/HomeP';
      });
  })
  .catch((error) => {
      if (error.response) {
          if (error.response.status === 400) {
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.response.data.error,
              });
          } else {
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Erro ao fazer login.',
              });
          }
      } else if (error.request) {
          // A solicitação foi feita mas nenhuma resposta foi recebida
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Erro na requisição.',
          });
      } else {
          // Algo aconteceu na configuração da solicitação que acionou um erro
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Erro ao fazer login.',
          });
      }
  });
};



function FormLoginParceiros() {
  const validationLogin = yup.object().shape({
    email: yup.string().email("Insira um email válido").required("Email é obrigatório"),
    senha: yup.string().min(8, "A senha deve ter 8 caracteres").required("Senha é obrigatória"),
  });

  return (
    <>
      <div id="boxLoginParceiro" className="boxLoginParceiro hide">
        <img src={LogoQ} alt="LogoQ" className="logoQuadlogin" />
        <h2>Entrar como Parceiro</h2>
        <Formik initialValues={{}} onSubmit={handleClickLoginParceiro} validationSchema={validationLogin}>
          {({ errors, touched }) => (
            
            <Form action="submit" className="formLogin">
             
              <div className="inputWrapper">
                <i><FaUser /></i>
                <Field name="email" 
                placeholder='Email' 
                className="form-field" />
              </div>
      
              <div className="inputWrapper">
                <i><FaLock /></i>
                <Field name="senha"
                type="password" 
                placeholder='Senha' 
                className="form-field" />
              </div>

              {errors.email && touched.email && <span className="form-error">{errors.email}</span>}
              {errors.senha && touched.senha && <span className="form-error">{errors.senha}</span>}

              <button type="submit">Conectar</button>
            </Form>
          )}
        </Formik>
            <h4>Não tem uma conta?<button onClick={ShowDivisao}   className='cadastre'>Cadastre-se</button></h4>
      </div>
    </>
  );
}

export default FormLoginParceiros;