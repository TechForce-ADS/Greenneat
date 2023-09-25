import React from 'react';
import LogoQ from '../../img/logoquad.png';
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import * as yup from 'yup';
import Swal from 'sweetalert2';



  const handleClickRegister = (values) => {
    axios.post("http://localhost:3001/registerParceiro", {
      cnpj: values.cnpj,
      nome_organizacao: values.nome_organizacao,
      email: values.email,
      endereco: values.endereco,
      cidade: values.cidade,
      horarios_funcionamento: values.horarios_funcionamento,
      parceiros: values.parceiros,
      senha: values.senha,
    })
    .then((response) => {
      console.log(response);  // Log the response for debugging
  
      if (response.status === 200) {  // Check the response status
        Swal.fire({
          icon: 'success',
          title: 'Usuário registrado com sucesso',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: 'error',  // Change to error icon
          title: 'Erro ao registrar usuário',
          text: 'Algo deu errado. Tente novamente mais tarde.'
        });
      }
    })
    .catch((error) => {
      console.log("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao registrar usuário',
        text: 'Algo deu errado. Tente novamente mais tarde.'
      });
    });
  };
  
  


function ShowLogin() {
  let DivisaoAnte = document.querySelector('#divisaoAnte');
  let formCadastro = document.querySelector('#containerCadastro');
  DivisaoAnte.classList.remove('hide')
  formCadastro.classList.add('hide')
}




const validationCadastro = yup.object().shape({
  cnpj: yup.string().required('CNPJ é obrigatório'),
  nome_organizacao: yup.string().required('Nome da organização é obrigatório'),
  email: yup.string().email('Insira um e-mail válido').required('E-mail é obrigatório'),
  senha: yup.string().required('Senha é obrigatório').min(8, "Senha deve ter 8 caracteres no minimo"),
  confirmSenha: yup.string().required('Confirme sua senha').oneOf([yup.ref("senha"), null], ("As senha não são iguais"))

});

function FormCadastro() {

  return (
    <>
      <div id='containerCadastro' className='containerCadastro hide'>
        <img src={LogoQ} alt='LogoQ' className='logoQuad' />
        <h3>Crie sua conta como parceiro:</h3>
        <Formik initialValues={{}} onSubmit={handleClickRegister} validationSchema={validationCadastro}>
          {({ errors, touched }) => (
            <Form className='formCadastro'>
              <div className='inputWrapper'>
                <Field type='text' name='cnpj' placeholder='CNPJ' className='form-field' />

              </div>

              <div className='inputWrapper'>
                <Field type='text' name='nome_organizacao' placeholder='Nome da organização' className='form-field' />

              </div>

              <div className='inputWrapper'>
                <Field type='text' name='email' placeholder='Email' className='form-field' />

              </div>

              <div className='inputWrapper'>
                <Field type='text' name='endereco' placeholder='Endereço' className='form-field' />
              </div>

              <div className='inputWrapper'>
                <Field type='text' name='cidade' placeholder='Sua Cidade' className='form-field' />
              </div>

              <div className='inputWrapper'>
                <Field type='text' name='horarios_funcionamento' placeholder='Seus Horários e dias de funcionamento' className='form-field' />
              </div>

              <div className='inputWrapper'>
                <Field type='text' name='parceiros' placeholder='Possui algum estabelecimento?' className='form-field' />
              </div>

              <div className='inputWrapper'>
                <Field type='password' name='senha' placeholder='Defina uma senha' className='form-field' />
              </div>

              <div className='inputWrapper'>
                <Field type='password' name='confirmSenha' placeholder='Confirme sua senha' className='form-field' />
              </div>

              <ErrorMessage name='cnpj' component='span' className='form-error' />
              <ErrorMessage name='nome_organizacao' component='span' className='form-error' />
              <ErrorMessage name='email' component='span' className='form-error' />
              <ErrorMessage name='senha' component='span' className='form-error' />
              <ErrorMessage name='confirmSenha' component='span' className='form-error' />


              <button type='submit'>Criar Conta</button>
            </Form>
          )}
        </Formik>
        <h4>
          Já possui uma conta?
          <button onClick={ShowLogin} className='cadastre'>
            Conecte-se
          </button>
        </h4>
      </div>
    </>
  );
}

export default FormCadastro;


