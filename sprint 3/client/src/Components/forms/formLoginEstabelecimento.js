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
  localStorage.setItem('adm', false);
}

function ShowDivisao() {
  let formEstabelecimento = document.querySelector('.boxLoginEstabelecimento');
  let Divisao = document.querySelector('#divisao');
  formEstabelecimento.classList.add('hide')
  Divisao.classList.remove('hide')

}

const handleClickLogin = (values) => {
  axios.post('http://localhost:3001/loginEstabelecimento', {
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
          window.location.href = 'http://localhost:3000/HomeE';
      });
  })
  .catch((error) => {
    let errorMessage = 'Email ou senha incorretos';
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
      iconColor: 'red',
      confirmButtonColor: confirmButtonColor,
    });
  });
};


function handleForgotPassword(email) {
  axios
    .post('http://localhost:3001/recuperarSenhaEstabelecimento', {
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
      let errorMessage = 'Este email não existe';

      if (error.response && error.response.status === 400) {
        const { message } = error.response.data;
        errorMessage = message;
      }
      Swal.fire({
        iconColor: '#FF0000',
        icon: 'error',
        confirmButtonColor: '#FF0000',
        text: errorMessage,
      });
    });
}

function formLoginEstabelecimento() {
  const validationLogin = yup.object().shape({
    email: yup.string().email("Insira um email válido").required("Email é obrigatório"),
    senha: yup.string().min(8, "A senha deve ter 8 caracteres").required("Senha é obrigatória"),
  });

  return (
    <>
      <div className="boxLoginEstabelecimento hide">
        <img src={LogoQ} alt="LogoQ" className="logoQuadlogin" />
        <h2>Entrar como Estabelecimento</h2>
        <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
          {({ errors, touched, values }) => (
            <Form action="submit" className="formLogin">
              <div className="inputWrapper">
                <i><FaUser /></i>
                <Field name="email" placeholder='Email' className="form-field" />
              </div>
              <div className="inputWrapper">
                <i><FaLock /></i>
                <Field name="senha" type="password" placeholder='Senha' className="form-field" />
              </div>
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
        <h4>Não tem uma conta?<button onClick={ShowDivisao} className='cadastre'>Cadastre-se</button></h4>
      </div>
    </>
  );
}

export default formLoginEstabelecimento;