import React from 'react';
import LogoQ from '../../img/logoquad.png';
import { FaUser, FaLock } from 'react-icons/fa';
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Swal from 'sweetalert2';
import axios from 'axios';


function saveLoginData(email, senha) {
  localStorage.setItem('email', email);
  localStorage.setItem('senha', senha);
  localStorage.setItem('parceiro', true);
}


function ShowDivisao() {
  let formLoginParceiro = document.querySelector('#boxLoginParceiro');
  let Divisao = document.querySelector('#divisao');
  formLoginParceiro.classList.add('hide')
  Divisao.classList.remove('hide')

}


const handleClickLoginParceiro = (values) => {
  axios
    .post('http://localhost:3001/loginParceiro', {
      email: values.email,
      senha: values.senha,
    })
    .then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Login efetuado com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        localStorage.setItem('isLoggedIn', true);
        saveLoginData(values.email, values.senha);
        window.location.href = 'http://localhost:3000/HomeP';
      });
    })
    .catch((error) => {
      let errorMessage = 'Usuário ou senha incorretos';
      let confirmButtonColor = 'red'; 

      if (error.response) {
        if (error.response.status === 400) {
          if (error.response.data === 'parceiro não encontrado') {
            errorMessage = 'Este email não está registrado';
          } else if (error.response.data === 'senha incorreta') {
            errorMessage = 'Email ou senha incorretos';
          }
        } else if (error.response.status === 401) {
          errorMessage = 'Usuário ou senha incorretos';
        }
      }

      Swal.fire({
        icon: 'error',
        text: errorMessage,
        iconColor: '#FF0000',
        confirmButtonColor: confirmButtonColor,
      });
    });
};



function handleForgotPassword(email) {
  axios
    .post('http://localhost:3001/recuperarSenhaParceiro', {
      email: email,
    })
    .then((response) => {
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Email de recuperação de senha enviado com sucesso',
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((error) => {
      console.log(error.response.data);
      let errorMessage = 'Ocorreu um erro ao enviar o email de recuperação de senha';

      if (error.response && error.response.status === 400) {
        const { message } = error.response.data;
        errorMessage = message;
      }
      Swal.fire({
        iconColor: '#fc5d00',
        icon: 'error',
        confirmButtonColor: '#fc5d00',
        text: errorMessage,
      });
    });
}


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
          {({ errors, touched, values }) => (
            
            <Form action="submit" className="formLogin">
             
              <div className="inputWrapper">
                <i><FaUser /></i>
                <Field name="email" 
                placeholder='Email' 
                className="form-field" />
              </div>
      
              <div className="inputWrapper">
                <i><FaLock /></i>
                <Field name="senha" type="password"  placeholder='Senha' className="form-field" /> </div>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="password" href="#" onClick={() => handleForgotPassword(values.email)}>
                Esqueceu sua senha?
                </a>
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