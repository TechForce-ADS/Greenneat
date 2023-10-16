const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require('cors');
const bcrypt = require('bcryptjs');
const {Estabelecimento,Parceiro,Coleta, Compra, sequelize} = require("./db/db");
const path = require('path');
require('dotenv').config({path:path.join(__dirname,'./.env')});
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { Console } = require("console");

const db = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database:  process.env.db_name,
    port: process.env.db_port,
});

// Use cookie-parser middleware
app.use(cookieParser());

// Configure express-session middleware
app.use(
  session({
    secret: '123',
    resave: false,
    saveUninitialized: false
  })
);

app.use(express.json());
app.use(cors());


//registrar Estabecimento
app.post("/registerEstabelecimento", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const emailExistente = await Estabelecimento.findOne({ where: { email: req.body.email } });
    const nomeExistente = await Estabelecimento.findOne({ where: { nomeOrganizacao: req.body.nomeOrganizacao } });

    if (nomeExistente && emailExistente) {
      res.status(400).json("nome e email já cadastrados");
    } else if (nomeExistente) {
      res.status(400).json("nome já cadastrado");
    } else if (emailExistente) {
      res.status(400).json("email já cadastrado");
    } else {
      const senha = req.body.senha;
      const hashedPassword = await bcrypt.hash(senha, salt);
      const novoEstabelecimento = new Estabelecimento({
        cnpj: req.body.cnpj,
        email: req.body.email,
        senha: hashedPassword,
        telefone: req.body.birthday,
        horariosFuncionamento: req.body.horariosFuncionamento,
        possuiParceiros: req.body.possuiParceiros,
        cidade: req.body.cidade,
        nomeOrganizacao: req.body.nomeOrganizacao,
        endereco: req.body.endereco,
      });
      const estabelecimento = await novoEstabelecimento.save();
      res.status(200).json(estabelecimento);
    }
  } catch (erro) {
    console.log(erro);
    res.status(500).json("Erro interno do servidor");
  }
});

//registrar Parceiro
app.post("/registerParceiro", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const emailExistente = await Parceiro.findOne({ where: { email: req.body.email } });
    const nomeExistente = await Parceiro.findOne({ where: { nomeOrganizacao: req.body.nomeOrganizacao } });

    if (nomeExistente && emailExistente) {
      res.status(400).json("nome e email já cadastrados");
    } else if (nomeExistente) {
      res.status(400).json("nome já cadastrado");
    } else if (emailExistente) {
      res.status(400).json("email já cadastrado");
    } else {
      const senha = req.body.senha;
      const hashedPassword = await bcrypt.hash(senha, salt);
      const novoParceiro = new Parceiro({
        cnpj: req.body.cnpj,
        email: req.body.email,
        senha: hashedPassword,
        horariosFuncionamento: req.body.horariosFuncionamento,
        parceiros: req.body.parceiros,
        cidade: req.body.cidade,
        nomeOrganizacao: req.body.nomeOrganizacao,
        endereco: req.body.endereco,
      });
      const parceiro = await novoParceiro.save();
      res.status(200).json(parceiro);
    }
  } catch (erro) {
    console.log(erro);
    res.status(500).json("Erro interno do servidor");
  }
});


//Login do Estabelecimento
app.post("/loginEstabelecimento",async (req,res) => {
    try{
      const estabelecimento = await Estabelecimento.findOne({where: {email: req.body.email}});
      if (!estabelecimento){
        res.status(400).json("estabelecimento não encontrado");
      }
      
      const validPassword = await bcrypt.compare(req.body.senha,estabelecimento.senha);
      if(!validPassword){
        res.status(400).json("senha incorreta");
      }
      req.session.estabelecimento = estabelecimento
      res.status(200).json(estabelecimento);
    }catch (err){
      console.log(err);
    }
  })

//Login do Parceiro
app.post("/loginParceiro",async (req,res) => {
    try{
      const parceiro = await Parceiro.findOne({where: {email: req.body.email}});
      console.log(parceiro)
      if (!parceiro){
        res.status(400).json("parceiro não encontrado");
      }
      const validPassword = await bcrypt.compare(req.body.senha,parceiro.senha);
      if(!validPassword){
        res.status(400).json("senha incorreta");
      }
      req.session.parceiro = parceiro
      res.status(200).json(parceiro);
    }catch (err){
      console.log(err);
    }
  })


  //Função para realizar as transações do óleo/crédito entre o parceiro e estabelecimento
  app.post("/realizarColeta", async (req, res) => {
    try {
      const quantidadeDeOleo = req.body.quantidadeDeOleo;
      const nomeEstabelecimento = req.body.nomeEstabelecimento;
      console.log('Nome do Estabelecimento:', nomeEstabelecimento);
      const estabelecimento = await Estabelecimento.findOne({ where: { nomeOrganizacao: nomeEstabelecimento } });
  
      if (!estabelecimento) {
        console.log('Estabelecimento não encontrado');
        return res.status(404).json({ error: 'Estabelecimento não encontrado' });
      }
  
      const parceiro = await Parceiro.findOne({ where: { id: req.body.ParceiroId } });
  
      if (!parceiro) {
        console.log('Parceiro não encontrado');
        return res.status(404).json({ error: 'Parceiro não encontrado' });
      }
  
      const credito = quantidadeDeOleo * 10; // Calcula o crédito recebido (10 créditos por litro de óleo)
  
      if (parceiro.credito >= credito) {
        parceiro.credito -= credito;
        await parceiro.save();
  
        estabelecimento.credito += credito;
        await estabelecimento.save();
  
        novaColeta = new Coleta({
          quantidadeDeOleo: quantidadeDeOleo,
          credito: credito, // Adiciona a quantidade de crédito recebido na tabela de coleta
          EstabelecimentoId: estabelecimento.id,
          ParceiroId: req.body.ParceiroId,
        });
  
        const coleta = await novaColeta.save();
        res.status(200).json(coleta);
      } else {
        console.log('Créditos insuficientes');
        return res.status(400).json({ error: 'Créditos insuficientes' });
      }
    } catch (erro) {
      console.log(erro);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  
  
  //Função do administrador adicionar crédito ao parceiro
  app.post("/adicionarCredito", async (req, res) => {
    try {
      const nomeOrganizacao = req.body.nomeOrganizacao;
      const credito = req.body.credito;
  
      const parceiro = await Parceiro.findOne({ where: { nomeOrganizacao: nomeOrganizacao } });
  
      if (!parceiro) {
        console.log('Parceiro não encontrado');
        return res.status(404).json({ error: 'Parceiro não encontrado' });
      }
  
      parceiro.credito += credito;
      await parceiro.save();
  
      res.status(200).json({ message: 'Crédito adicionado com sucesso', novoCredito: parceiro.credito });
    } catch (erro) {
      console.log(erro);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  
  



  app.get("/perfil/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const estabelecimento = await Estabelecimento.findOne({ where: { email } });
      const parceiro = await Parceiro.findOne({ where: { email } });
  
      if (estabelecimento) {
        res.status(200).json(estabelecimento);
      } else if (parceiro) {
        res.status(200).json(parceiro);
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (erro) {
      console.log(erro);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });


  //Histórico do parceiro
  app.get("/historicoParceiro", async (req, res) => {
    try {
      const parceiroId = req.query.parceiroId;
      const coletas = await Coleta.findAll({
        where: {
          ParceiroId: parceiroId
        },
        include: [{
          model: Estabelecimento, 
          attributes: ['nomeOrganizacao']
        }]
      });

  
      return res.status(200).json(coletas);
    } catch (error) {
      return res.status(400).json({ message: "Falha ao listar as coletas" });
    }
  });
  
  //Histórico do estabelecimento
  app.get("/historicoEstabelecimento", async (req, res) => {
    try {
      const estabelecimentoId = req.query.estabelecimentoId;
      const coletas = await Coleta.findAll({
        where: {
          EstabelecimentoId: estabelecimentoId
        },
        include: [{
          model: Parceiro,
          attributes: ['nomeOrganizacao']
        }]
      });

      return res.status(200).json(coletas);
    } catch (error) {
      return res.status(400).json({ message: "Falha ao listar as coletas do estabelecimento" });
    }
  });



  app.get("/historicoCompras", async (req, res) => {
    try {
      const estabelecimentoId = req.query.estabelecimentoId;  // Correção: alterado para req.query.estabelecimentoId
      const compras = await Compra.findAll({
        where: {
          EstabelecimentoId: estabelecimentoId  // Correção: alterado para EstabelecimentoId
        }
      });
      return res.status(200).json(compras);
    } catch (error) {
      return res.status(400).json({ message: "Falha ao listar as compras" });
    }
  });



  
  app.post("/realizarCompra", async (req, res) => {
    try {
        const { produtos, total, EstabelecimentoId } = req.body;

        await sequelize.transaction(async (t) => {
            const estabelecimento = await Estabelecimento.findOne({ where: { id: EstabelecimentoId } });

            if (!estabelecimento) {
                return res.status(404).json({ error: 'Estabelecimento não encontrado' });
            }

            if (total > estabelecimento.credito) {
                return res.status(400).json({ error: 'Saldo insuficiente' });
            }

            estabelecimento.credito -= total;
            await estabelecimento.save({ transaction: t });

            // Crie a nova compra no banco de dados
            const novaCompra = await Compra.create(
                {
                    produtos,
                    total,
                    EstabelecimentoId,
                },
                { transaction: t }
            );


            res.status(200).json(novaCompra);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


  app.get("/parceiros", async(req, res) => {
    try {
      const parceiros = await Parceiro.findAll({
        attributes: ['id', 'nomeOrganizacao', 'email', 'endereco', 'cidade', 'createdAt', 'updatedAt']
      });
      return res.status(200).json(parceiros);
    } catch (error) {
      return res.status(400).json({ message: "Falha ao listar parceiros" });
    }
  });

  app.get("/parceiro/:id", async(req, res) => {
    try {
      const id = req.params.id; 
      const parceiro = await Parceiro.findOne({
        where: { id }
      });
      return res.status(200).json(parceiro);
    } catch (error) {
      return res.status(400).json({ message: "Falha ao pesquisar parceiro" });
    }
  });

  app.get("/estabelecimentos", async(req, res) => {
    try {
      const estabelecimentos = await Estabelecimento.findAll();
      return res.status(200).json(estabelecimentos);
    } catch (error) {
      return res.status(400).json({ message: "Falha ao listar estabelecimentos" });
    }
  });

  app.get("/estabelecimento/:id", async(req, res) => {
    try {
      const id = req.params.id; 
      const estabelecimento = await Estabelecimento.findOne({
        where: { id }
      });
      return res.status(200).json(estabelecimento);
    } catch (error) {
      return res.status(400).json({ message: "Falha ao pesquisar estabelecimento" });
    }
  });



  
  // app.delete("/parceiros/:id", async (req, res) => {
  //   const parceiroId = req.params.id;
  
  //   try {
  //     const parceiro = await Parceiro.findByPk(parceiroId);
  
  //     if (!parceiro) {
  //       return res.status(404).json({ message: "Parceiro não encontrado" });
  //     }

  //     await parceiro.destroy();
  //     return res.status(200).json({ message: "Parceiro removido com sucesso" });
  //   } catch (error) {
  //     return res.status(400).json({ message: "Falha ao remover o parceiro" });
  //   }
  // });



  app.post("/adicionarCredito", async (req, res) => {
    try {
      const nomeOrganizacao = req.body.nomeOrganizacao;
      const credito = req.body.credito;

      const parceiro = await Parceiro.findOne({ where: { nomeOrganizacao: nomeOrganizacao } });

      if (!parceiro) {
        console.log('Parceiro não encontrado');
        return res.status(404).json({ error: 'Parceiro não encontrado' });
      }

      parceiro.credito += credito;
      await parceiro.save();

      res.status(200).json({ message: 'Crédito adicionado com sucesso', novoCredito: parceiro.credito });
    } catch (erro) {
      console.log(erro);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });


   //Função do administrador adicionar crédito ao estabelecimento
   app.post("/adicionarCreditoE", async (req, res) => {
    try {
      const nomeOrganizacao = req.body.nomeOrganizacao;
      const credito = req.body.credito;

      const estabelecimento = await Estabelecimento.findOne({ where: { nomeOrganizacao: nomeOrganizacao } });

      if (!estabelecimento) {
        console.log('Estabelecimento não encontrado');
        return res.status(404).json({ error: 'Estabelecimento não encontrado' });
      }

      estabelecimento.credito += credito;
      await estabelecimento.save();

      res.status(200).json({ message: 'Crédito adicionado com sucesso', novoCredito: estabelecimento.credito });
    } catch (erro) {
      console.log(erro);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });


  //Função do admnistrador de diminuir credito para parceiro
  app.post("/retirarCredito", async (req, res) => {
    try {
      const nomeOrganizacao = req.body.nomeOrganizacao;
      const credito = req.body.credito;

      const parceiro = await Parceiro.findOne({ where: { nomeOrganizacao: nomeOrganizacao } });

      if (!parceiro) {
        console.log('Parceiro não encontrado');
        return res.status(404).json({ error: 'Parceiro não encontrado' });
      }

      parceiro.credito -= credito;
      await parceiro.save();

      res.status(200).json({ message: 'Crédito retirado com sucesso', novoCredito: parceiro.credito });
    } catch (erro) {
      console.log(erro);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });


  //Função do administrador de diminuir credito para estabelecimento
  app.post("/retirarCreditoE", async (req, res) => {
    try {
      const nomeOrganizacao = req.body.nomeOrganizacao;
      const credito = req.body.credito;

      const estabelecimento = await Estabelecimento.findOne({ where: { nomeOrganizacao: nomeOrganizacao } });

      if (!estabelecimento) {
        console.log('Estabelecimento não encontrado');
        return res.status(404).json({ error: 'Estabelecimento não encontrado' });
      }

      estabelecimento.credito -= credito;
      await estabelecimento.save();

      res.status(200).json({ message: 'Crédito retirado com sucesso', novoCredito: estabelecimento.credito });
    } catch (erro) {
      console.log(erro);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });



app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
