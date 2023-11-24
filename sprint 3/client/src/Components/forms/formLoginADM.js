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
  localStorage.setItem('adm', true);
}


const handleClickLoginADM = (values) => {
  axios
    .post('http://localhost:3001/loginADM', {
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
        console.log('Email:', values.email);
        console.log('Senha:', values.senha);


        window.location.href = 'http://localhost:3000/gestao';
      });
    })
    .catch((error) => {
      let errorMessage = 'Usuário ou senha incorretos';
      let confirmButtonColor = 'red'; 

      if (error.response) {
        if (error.response.status === 400) {
          if (error.response.data === 'ADM não encontrado') {
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



function FormLoginADM() {
  const validationLogin = yup.object().shape({
    email: yup.string().email("Insira um email válido").required("Email é obrigatório"),
    senha: yup.string().min(8, "A senha deve ter 8 caracteres").required("Senha é obrigatória"),
  });

  return (
    <>
      <div id="boxLoginADM" className="boxLoginParceiro hide ">
        <img src={LogoQ} alt="LogoQ" className="logoQuadlogin" />
        <h2>Entrar como Administrador</h2>
        <Formik initialValues={{}} onSubmit={handleClickLoginADM} validationSchema={validationLogin}>
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
              
           
              {errors.email && touched.email && <span className="form-error">{errors.email}</span>}
              {errors.senha && touched.senha && <span className="form-error">{errors.senha}</span>}

              <button type="submit">Conectar</button>
            </Form>
          )}
        </Formik>
           
      </div>
    </>
    
  );
}

export default FormLoginADM;