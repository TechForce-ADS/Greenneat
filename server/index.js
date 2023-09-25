const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require('cors');
const bcrypt = require('bcryptjs');
const {Estabelecimento,Parceiros} = require("./db/db");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "greenneat",
    port: "3306",
});

app.use(express.json());
app.use(cors());

app.post("/registerEstabelecimento",async (req,res) => {
    try{
      const salt = await bcrypt.genSalt(10);
      //senha1 = req.body.senha1;
      //senha2 = req.body.senha2;
      //if (senha1 != senha2){
        //res.status(400).json("senhas diferentes");
      //}
      //let tamanho = senha1.length
      //const temLetra = /[a-zA-Z]/.test(senha1);
      //const temNumero = /\d/.test(senha1);
      const emailExistente = await Estabelecimento.findOne({where: {email: req.body.email}});
      const nomeExistente = await Estabelecimento.findOne({where: {nomeOrganizacao: req.body.nomeOrganizacao}});
     //if (!temLetra || !temNumero || tamanho < 8) {
        //res.status(400).json("a senha deve conter 8 caracteres, letras e números");
      //}
      if (nomeExistente){
        res.status(400).json("nome já cadastrado");
      }
      if (emailExistente){
        res.status(400).json("email já cadastrado");
      }
      senha = req.body.senha
      const hashedPassword = await bcrypt.hash(senha,salt);
      const novoEstabelecimento = new Estabelecimento({
        cnpj:req.body.cnpj,
        email:req.body.email,
        senha:hashedPassword,
        telefone:req.body.birthday,
        horariosFuncionamento:req.body.horariosFuncionamento,
        possuiParceiros:req.body.possuiParceiros,
        cidade:req.body.cidade,
        nomeOrganizacao:req.body.nomeOrganizacao,
        endereco:req.body.endereco
      });
      const estabelecimento = await novoEstabelecimento.save();
      res.status(200).json(estabelecimento);
    }catch(erro){
      console.log(erro);
    }
  })

// app.post("/registerEstabelecimento", async (req, res) => {
//     try {
//         console.log("teste")
//         const email = req.body.email;

//         db.query("SELECT * FROM estabelecimentos WHERE email = ?", [email], (err, results) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({
//                     error: "Ocorreu um erro interno no servidor."
//                 });
//             }

//             if (results.length > 0) {
//                 return res.status(400).json({
//                     error: "Este email já está cadastrado."
//                 });
//             }

//             const novoUsuario = {
//                 cnpj: req.body.cnpj,
//                 nomeOrganizacao: req.body.nomeOrganizacao,
//                 email: req.body.email,
//                 endereco: req.body.endereco,
//                 cidade: req.body.cidade,
//                 horariosFuncionamento: req.body.horariosFuncionamento,
//                 possuiParceiros: req.body.possuiParceiros,
//                 senha: req.body.senha,
//             };

//             db.query('INSERT INTO estabelecimentos SET ?', novoUsuario, (error, results) => {
//                 if (error) {
//                     console.log(error);
//                     return res.status(500).json({
//                         error: "Ocorreu um erro ao registrar o usuário."
//                     });
//                 }
//                 return res.status(200).json({
//                     message: "Usuário registrado com sucesso."
//                 });
//             });
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             error: "Ocorreu um erro interno no servidor."
//         });
//     }
// });

app.post("/registerParceiro",async (req,res) => {
    try{
      const salt = await bcrypt.genSalt(10);
      //senha1 = req.body.senha1;
      //senha2 = req.body.senha2;
      //if (senha1 != senha2){
        //res.status(400).json("senhas diferentes");
      //}
      //let tamanho = senha1.length
      //const temLetra = /[a-zA-Z]/.test(senha1);
      //const temNumero = /\d/.test(senha1);
      const emailExistente = await Parceiros.findOne({where: {email: req.body.email}});
      //const nomeExistente = await Parceiros.findOne({where: {nomeOrganizacao: req.body.nomeOrganizacao}});
     //if (!temLetra || !temNumero || tamanho < 8) {
        //res.status(400).json("a senha deve conter 8 caracteres, letras e números");
      //}
      //if (nomeExistente){
        //res.status(400).json("nome já cadastrado");
      //}
      if (emailExistente){
        res.status(400).json("email já cadastrado");
      }
      senha = req.body.senha
      const hashedPassword = await bcrypt.hash(senha,salt);
      const novoParceiro = new Parceiros({
        cnpj:req.body.cnpj,
        email:req.body.email,
        senha:hashedPassword,
        horariosFuncionamento:req.body.horarios_funcionamento,
        possuiParceiros:req.body.parceiros,
        cidade:req.body.cidade,
        nomeOrganizacao:req.body.nome_organizacao,
        endereco:req.body.endereco
      });
      const parceiro = await novoParceiro.save();
      res.status(200).json(parceiro);
    }catch(erro){
      console.log(erro);
    }
  })

// app.post("/registerParceiro", async (req, res) => {
//     try {
//         const email = req.body.email;

//         db.query("SELECT * FROM parceiros WHERE email = ?", [email], (err, results) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({
//                     error: "Ocorreu um erro interno no servidor."
//                 });
//             }

//             if (results.length > 0) {
//                 return res.status(400).json({
//                     error: "Este email já está cadastrado."
//                 });
//             }

//             const novoParceiro = {
//                 cnpj: req.body.cnpj,
//                 nome_organizacao: req.body.nome_organizacao,
//                 email: req.body.email,
//                 endereco: req.body.endereco,
//                 cidade: req.body.cidade,
//                 horarios_funcionamento: req.body.horarios_funcionamento,
//                 parceiros: req.body.parceiros,
//                 senha: req.body.senha,
//             };

//             db.query('INSERT INTO parceiros SET ?', novoParceiro, (error, results) => {
//                 if (error) {
//                     console.log(error);
//                     return res.status(500).json({
//                         error: "Ocorreu um erro ao registrar o usuário."
//                     });
//                 }
//                 return res.status(200).json({
//                     message: "Usuário registrado com sucesso."
//                 });
//             });
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             error: "Ocorreu um erro interno no servidor."
//         });
//     }
// });

app.post("/login",async (req,res) => {
    try{
      const estabelecimento = await Estabelecimento.findOne({where: {email: req.body.email}});
      if (!estabelecimento){
        res.status(400).json("estabelecimento não encontrado");
      }
      
      const validPassword = await bcrypt.compare(req.body.senha,estabelecimento.senha);
      if(!validPassword){
        res.status(400).json("senha incorreta");
      }
      res.status(200).json(estabelecimento);
    }catch (err){
      console.log(err);
    }
  })


// app.post("/login", async (req, res) => {
//     const email = req.body.email;
//     const senha = req.body.senha;

//     db.query("SELECT * FROM estabelecimento WHERE email = ? ", [email, email], (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({
//                 error: "Ocorreu um erro interno no servidor."
//             });
//         }

//         if (results.length === 0) {
//             return res.status(400).json({
//                 error: "Usuário não encontrado."
//             });
//         }

//         const user = results[0];
//         if (user.senha !== senha) {
//             return res.status(400).json({
//                 error: "Senha incorreta."
//             });
//         }

//         return res.status(200).json({
//             message: "Login bem-sucedido!",
//             user: user
//         });
//     });
// });

app.post("/loginParceiro",async (req,res) => {
    try{
      const parceiro = await Parceiros.findOne({where: {email: req.body.email}});
      if (!parceiro){
        res.status(400).json("estabelecimento não encontrado");
      }
      const validPassword = await bcrypt.compare(req.body.senha,parceiro.senha);
      if(!validPassword){
        res.status(400).json("senha incorreta");
      }
      res.status(200).json(parceiro);
    }catch (err){
      console.log(err);
    }
  })

// app.post("/loginParceiro", async (req, res) => {
//     const email = req.body.email;
//     const senha = req.body.senha;

//     db.query("SELECT * FROM parceiros WHERE email = ?", [email, email], (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({
//                 error: "Ocorreu um erro interno no servidor."
//             });
//         }

//         if (results.length === 0) {
//             return res.status(400).json({
//                 error: "Usuário não encontrado."
//             });
//         }

//         const user = results[0];
//         if (user.senha !== senha) {
//             return res.status(400).json({
//                 error: "Senha incorreta."
//             });
//         }

//         return res.status(200).json({
//             message: "Login bem-sucedido!",
//             user: user
//         });
//     });
// });

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
