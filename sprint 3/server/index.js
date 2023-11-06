const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require('cors');
const bcrypt = require('bcryptjs');
const { Estabelecimento, Parceiro, Coleta, Compra, Credito,Oleo,Administrador, sequelize } = require("./db/db");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, './.env') });
const session = require('express-session');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

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


app.post("/comprarCredito", async (req, res) => {
  try {
    const email = req.body.email;
    const credito = req.body.credito;

    const parceiro = await Parceiro.findOne({ where: { email: email } });

    if (!parceiro) {
      console.log('Parceiro não encontrado');
      return res.status(404).json({ error: 'Parceiro não encontrado' });
    }
    
    parceiro.credito += credito;
    await parceiro.save();
    
    await Credito.create({
      credito: credito,
      valor: credito, // Pode ser necessário ajustar este valor de acordo com sua lógica de negócios
      ParceiroId: parceiro.id
    });

    res.status(200).json({ message: 'Crédito adicionado com sucesso', novoCredito: parceiro.credito });
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


  //Histórico do parceiro
  app.get("/historicoCredito", async (req, res) => {
    try {
      const parceiroId = req.query.parceiroId;
      const creditos = await Credito.findAll({
        where: {
          ParceiroId: parceiroId
        },
      });
  
      return res.status(200).json(creditos); // Correção: alterado de coletas para creditos
    } catch (error) {
      return res.status(400).json({ message: "Falha ao listar os créditos" }); // Correção: alterado a mensagem
    }
  });
  


app.post("/registerEstabelecimento", async (req, res) => {
  try {
    const { nomeOrganizacao, email, cnpj, endereco, cidade, horariosFuncionamento, possuiParceiros, senha } = req.body;

    if (!nomeOrganizacao || !email || !cnpj || !senha || !endereco || !cidade || !horariosFuncionamento || !possuiParceiros ) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const emailExistente = await Estabelecimento.findOne({ where: { email } });

    if (emailExistente) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const cnpjExistente = await Estabelecimento.findOne({ where: { cnpj } });

    if (cnpjExistente) {
      return res.status(400).json({ message: "CNPJ já cadastrado" });
    }


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'brenertestando@gmail.com',
        pass: 'fpbvjzgaiyzuneek',
      },
    });

    const confirmUrl = 'http://localhost:3000/confirmaEmail';

    const token = jwt.sign(
      { email },
      'd#7Hj&f$23sPc89!TqA',
      { expiresIn: '1h' }
    );

    const mailOptions = {
      from: ' Greenneat <brenertestando@gmail.com>',
      to: email,
      subject: 'Confirmação de e-mail',
      html: `Para confirmar seu e-mail, acesse o seguinte link: <a href="${confirmUrl}?token=${token}">${confirmUrl}?token=${token}</a>`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error('Erro ao enviar o e-mail:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }

      try {
        const salt = await bcrypt.genSalt(10);
        const hashedSenha = await bcrypt.hash(senha, salt);

        const EstabelecimentoCriado = await Estabelecimento.create({ nomeOrganizacao, email, cnpj, senha: hashedSenha, endereco, cidade, horariosFuncionamento, possuiParceiros, token, emailConfirmed: false });

        console.log('E-mail enviado com sucesso:', info.response);
        return res.json({ message: 'Token enviado para o e-mail' });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Falha ao cadastrar usuário" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Falha ao cadastrar usuário" });
  }
});


//registrar Parceiro
app.post("/registerParceiro", async (req, res) => {
  try {
    const { nomeOrganizacao, email, endereco, cidade, horariosFuncionamento, senha } = req.body;

    if (!nomeOrganizacao || !email || !endereco|| !cidade || !horariosFuncionamento || !senha ) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const emailExistente = await Parceiro.findOne({ where: { email } });

    if (emailExistente) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'brenertestando@gmail.com',
        pass: 'fpbvjzgaiyzuneek',
      },
    });

    const confirmUrl = 'http://localhost:3000/confirmaParceiro';

    const token = jwt.sign(
      { email },
      'd#7Hj&f$23sPc89!TqA',
      { expiresIn: '1h' }
    );

    const mailOptions = {
      from: 'brenertestando@gmail.com',
      to: email,
      subject: 'Confirmação de e-mail',
      html: `Para confirmar seu e-mail, acesse o seguinte link: <a href="${confirmUrl}?token=${token}">${confirmUrl}?token=${token}</a>`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error('Erro ao enviar o e-mail:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }

      try {
        const salt = await bcrypt.genSalt(10);
        const hashedSenha = await bcrypt.hash(senha, salt);

        const ParceiroCriado = await Parceiro.create({ nomeOrganizacao, email, senha: hashedSenha, endereco, cidade, horariosFuncionamento, token, emailConfirmed: false });

        console.log('E-mail enviado com sucesso:', info.response);
        return res.json({ message: 'Token enviado para o e-mail' });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Falha ao cadastrar usuário" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Falha ao cadastrar usuário" });
  }
});





//Login do Estabelecimento
app.post("/loginEstabelecimento", async (req, res)  => {
  try {
    const { email, senha } = req.body;

    // Buscar usuário com o email fornecido no banco de dados
    const estabelecimento = await Estabelecimento.findOne({ where: { email } });

    // Se não encontrar o usuário, retornar erro
    if (!estabelecimento) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    if (!estabelecimento.emailConfirmed) {
      return res.status(401).json("E-mail não confirmado. Por favor, confirme seu e-mail para fazer login.");
    }

    // Verificar se a senha fornecida corresponde à senha armazenada no banco de dados
    const match = await bcrypt.compare(senha, estabelecimento.senha);
    if (!match) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    return res.status(200).json({ estabelecimento });

  } catch (error) {
    return res.status(400).json({ message: 'Falha ao autenticar usuário' });
  }
});


//Login do Parceiro
app.post("/loginParceiro", async (req, res)  => {
  try {
    const { email, senha } = req.body;

    // Buscar usuário com o email fornecido no banco de dados
    const parceiro = await Parceiro.findOne({ where: { email } });

    // Se não encontrar o usuário, retornar erro
    if (!parceiro) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    if (!parceiro.emailConfirmed) {
      return res.status(401).json("E-mail não confirmado. Por favor, confirme seu e-mail para fazer login.");
    }

    // Verificar se a senha fornecida corresponde à senha armazenada no banco de dados
    const match = await bcrypt.compare(senha, parceiro.senha);
    if (!match) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    return res.status(200).json({ parceiro });

  } catch (error) {
    return res.status(400).json({ message: 'Falha ao autenticar usuário' });
  }
});


  //Função para realizar as transações do óleo/crédito entre o parceiro e estabelecimento
   app.post("/realizarColeta", async (req, res) => {
     try {
       const quantidadeDeOleo = req.body.quantidadeDeOleo;
       const nomeEstabelecimento = req.body.nomeEstabelecimento;
       const nomeParceiro = req.body.nomeParceiro;
       const tipoOleo = req.body.tipoOleo
       const estabelecimento = await Estabelecimento.findOne({ where: { nomeOrganizacao: nomeEstabelecimento } });
  
       if (!estabelecimento) {
         console.log('Estabelecimento não encontrado');
         return res.status(404).json({ error: 'Estabelecimento não encontrado' });
       }

       const idEstabelecimento = estabelecimento.id
  
       const parceiro = await Parceiro.findOne({ where: { nomeOrganizacao: nomeParceiro } });

       if (!parceiro) {
         console.log('Parceiro não encontrado');
         return res.status(404).json({ error: 'Parceiro não encontrado' });
       }

       const idParceiro = parceiro.id

       const oleo = await Oleo.findOne({ where: { tipo: tipoOleo } }); 
  
       const credito = quantidadeDeOleo * oleo.preco;
  
       if (parceiro.credito >= credito) {
       parceiro.credito -= credito;
         await parceiro.save();
  
         estabelecimento.credito += credito;
         await estabelecimento.save();
  
         novaColeta = new Coleta({
           quantidade: quantidadeDeOleo,
           credito: credito, // Adiciona a quantidade de crédito recebido na tabela de coleta
           EstabelecimentoId: idEstabelecimento,
           tipo:oleo.tipo,
           ParceiroId: idParceiro,
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
      const EstabelecimentoId = req.query.EstabelecimentoId;
      const coletas = await Coleta.findAll({
        where: {
          EstabelecimentoId: EstabelecimentoId
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


  app.get("/historicoComprasEstabelecimento", async (req, res) => {
    try {
      const EstabelecimentoId = req.query.EstabelecimentoId;
      const compras = await Compra.findAll({
        where: {
          EstabelecimentoId: EstabelecimentoId,
          tipo: "estabelecimento"
        }
      });
      return res.status(200).json(compras);
    } catch (error) {
      return res.status(400).json({ message: "Falha ao listar as compras" });
    }
  });


  app.get("/historicoComprasParceiro", async (req, res) => {
    try {
      const EstabelecimentoId = req.query.EstabelecimentoId;
      const compras = await Compra.findAll({
        where: {
          EstabelecimentoId: EstabelecimentoId,
          tipo: "parceiro"
        }
      });
      return res.status(200).json(compras);
    } catch (error) {
      return res.status(400).json({ message: "Falha ao listar as compras" });
    }
  });



  app.post("/CompraParceiro", async (req, res) => {
    try {
        const { produtos, total, EstabelecimentoId, tipo } = req.body;
  
        await sequelize.transaction(async (t) => {
            
            const parceiro = await Parceiro.findOne({ where: { id: EstabelecimentoId } });
        
  
            if (!parceiro) {
                return res.status(404).json({ error: 'Parceiro não encontrado' });
            }
  
            if (total > parceiro.credito) {
                return res.status(400).json({ error: 'Saldo insuficiente' });
            }
  
            parceiro.credito -= total;
            await parceiro.save({ transaction: t });
  
            // Crie a nova compra no banco de dados
            const novaCompra = await Compra.create(
                {
                    produtos,
                    total,
                    EstabelecimentoId,
                    tipo,
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
  


  
  app.post("/realizarCompra", async (req, res) => {
    try {
        const { produtos, total, EstabelecimentoId, tipo } = req.body;

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
                    tipo,
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


  app.get("/historicoComprasADM", async (req, res) => {
    try {
        const compras = await Compra.findAll({
            // Seus outros filtros ou consultas aqui
        });

        // Mapeia as compras para adicionar o nome da organização
        const comprasComNomeOrganizacao = await Promise.all(
            compras.map(async (compra) => {
                let nomeOrganizacao = '';
                if (compra.tipo === 'estabelecimento') {
                    const estabelecimento = await Estabelecimento.findByPk(compra.EstabelecimentoId);
                    nomeOrganizacao = estabelecimento ? estabelecimento.nomeOrganizacao : 'N/A';
                } else if (compra.tipo === 'parceiro') {
                    const parceiro = await Parceiro.findByPk(compra.EstabelecimentoId);
                    nomeOrganizacao = parceiro ? parceiro.nomeOrganizacao : 'N/A';
                }

                // Crie um novo objeto de compra com o nome da organização
                return {
                    ...compra.toJSON(),
                    nomeOrganizacao,
                };
            })
        );

        return res.status(200).json(comprasComNomeOrganizacao);
    } catch (error) {
        return res.status(400).json({ message: "Falha ao listar as compras" });
    }
});



  
  
  app.get("/confirmatoken=:token", async (req, res) => {
    try {
      const { token } = req.params;

      // Verificar o token e atualizar a coluna emailConfirmed para true
      const estabelecimento = await Estabelecimento.findOne({ where: { token } });

      if (!estabelecimento) {
        return res.status(404).json({ message: 'Token inválido' });
      }

      await estabelecimento.update({ emailConfirmed: true, token: null });

      return res.status(200).json({ message: 'Email confirmado com sucesso' });
    } catch (error) {
      console.error('Erro ao confirmar o email', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });





  
  app.get("/confirmatokenParceiro=:token", async (req, res) => {
    try {
      const { token } = req.params;

      // Verificar o token e atualizar a coluna emailConfirmed para true
      const parceiro = await Parceiro.findOne({ where: { token } });

      if (!parceiro) {
        return res.status(404).json({ message: 'Token inválido' });
      }

      await parceiro.update({ emailConfirmed: true, token: null });

      return res.status(200).json({ message: 'Email confirmado com sucesso' });
    } catch (error) {
      console.error('Erro ao confirmar o email', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });









// Rota para remover um estabelecimento pelo ID
  app.delete("/estabelecimento/:id", async (req, res) => {
    try {
      const estabelecimentoId = req.params.id;

      // Encontrar o estabelecimento pelo ID
      const estabelecimento = await Estabelecimento.findByPk(estabelecimentoId);

      // Se o estabelecimento não existir, retornar um erro 404
      if (!estabelecimento) {
        return res.status(404).json({ error: "Estabelecimento não encontrado" });
      }

      // Remover o estabelecimento do banco de dados
      await estabelecimento.destroy();

      // Responder com uma mensagem de sucesso
      res.status(200).json({ message: "Estabelecimento removido com sucesso" });
    } catch (error) {
      // Se ocorrer um erro, retornar um erro 500
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  app.put("/estabelecimento/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const { nomeOrganizacao, email, senha, endereco, cidade, horariosFuncionamento, possuiParceiros } = req.body;

      await Estabelecimento.update(
        { nomeOrganizacao, email, senha, endereco, cidade, horariosFuncionamento, possuiParceiros },
        {
          where: {
            id: id,
          },
        }
      );

      return res.status(200).json({ message: "Usuário atualizado" });
    } catch (erro) {
      return res.status(400).json({ message: "Falha ao atualizar o usuário" })
    }
  });

  // Rota para remover um estabelecimento pelo ID
  app.delete("/parceiro/:id", async (req, res) => {
    try {
      const parceiroId = req.params.id;

      // Encontrar o estabelecimento pelo ID
      const parceiro = await Parceiro.findByPk(parceiroId);

      // Se o estabelecimento não existir, retornar um erro 404
      if (!parceiro) {
        return res.status(404).json({ error: "Parceiro não encontrado" });
      }

      // Remover o estabelecimento do banco de dados
      await parceiro.destroy();

      // Responder com uma mensagem de sucesso
      res.status(200).json({ message: "Parceiro removido com sucesso" });
    } catch (error) {
      // Se ocorrer um erro, retornar um erro 500
      console.log(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  //definir preço do óleo
app.post("/definirPreco", async (req, res) => {
  try {
    const { preco, tipo } = req.body;
    const oleoTipoExistente = await Oleo.findOne({ where: { tipo: tipo} });

    if(oleoTipoExistente){
      oleoTipoExistente.preco = preco;
      await oleoTipoExistente.save()
    }

    if(!oleoTipoExistente){
      const novoOleo = new Oleo({
        tipo: tipo,
        preco: preco,
      });
      const oleo = await novoOleo.save();
      console.log(oleo)
      res.status(200).json(oleo);
    }
  } catch (erro) {
    res.send(erro);
  }
});



app.post("/registerAdm", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha ) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const emailExistente = await Administrador.findOne({ where: { email } });

    if (emailExistente) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'brenertestando@gmail.com',
        pass: 'fpbvjzgaiyzuneek',
      },
    });

    const confirmUrl = 'http://localhost:3000/confirmaEmail';

    const token = jwt.sign(
      { email },
      'd#7Hj&f$23sPc89!TqA',
      { expiresIn: '1h' }
    );

    const mailOptions = {
      from: 'brenertestando@gmail.com',
      to: email,
      subject: 'Confirmação de e-mail',
      html: `Para confirmar seu e-mail, acesse o seguinte link: <a href="${confirmUrl}?token=${token}">${confirmUrl}?token=${token}</a>`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error('Erro ao enviar o e-mail:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }

      try {
        const salt = await bcrypt.genSalt(10);
        const hashedSenha = await bcrypt.hash(senha, salt);

        const admCriado = await Administrador.create({ nome, email,senha: hashedSenha, token, emailConfirmed: false });
        console.log(admCriado)

        console.log('E-mail enviado com sucesso:', info.response);
        return res.json({ message: 'Token enviado para o e-mail' });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Falha ao cadastrar usuário" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Falha ao cadastrar usuário" });
  }
});
//Login do Administrador
app.post("/loginAdm", async (req, res)  => {
  try {
    const { email, senha } = req.body;

    // Buscar adm com o email fornecido no banco de dados
    const adm = await Administrador.findOne({ where: { email } });

    // Se não encontrar o usuário, retornar erro
    if (!adm) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    //if (!adm.emailConfirmed) {
      //return res.status(401).json("E-mail não confirmado. Por favor, confirme seu e-mail para fazer login.");
    //}

    // Verificar se a senha fornecida corresponde à senha armazenada no banco de dados
    const match = await bcrypt.compare(senha, adm.senha);
    if (!match) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    return res.status(200).json({ adm });

  } catch (error) {
    return res.status(400).json({ message: 'Falha ao autenticar administrador' });
  }
});


//editar informações do estabelecimento
app.put('/editarEstabelecimento/:id', async (req, res) => {
  const {id} = req.params;
  const { nomeOrganizacao, email, endereco, cidade, horariosFuncionamento, possuiParceiros } = req.body;

  try {
    const estabelecimento = await Estabelecimento.findByPk(id);

    if (!estabelecimento) {
      return res.status(404).json({ message: 'Estabelecimento não encontrado' });
    }

    if (nomeOrganizacao) {
      estabelecimento.nomeOrganizacao = nomeOrganizacao;
    }
    if (email) {
      estabelecimento.email = email;
    }
    if (endereco) {
      estabelecimento.endereco = endereco;
    }
    if (cidade) {
      estabelecimento.cidade = cidade;
    }
    if (horariosFuncionamento) {
      estabelecimento.horariosFuncionamento = horariosFuncionamento;
    }
    if (possuiParceiros) {
      estabelecimento.possuiParceiros = possuiParceiros;
    }

    await estabelecimento.save();

    return res.json({ message: 'Estabelecimento atualizado' });
  } catch (error) {
    return res.status(500).json(error);
  }
});



//editar parceiro
app.put('/editarParceiro/:id', async (req, res) => {
  const {id} = req.params;
  const { nomeOrganizacao, email, endereco, cidade, horariosFuncionamento, possuiParceiros } = req.body;

  try {
    const parceiro = await Parceiro.findByPk(id);

    if (!parceiro) {
      return res.status(404).json({ message: 'parceiro não encontrado' });
    }

    if (nomeOrganizacao) {
      parceiro.nomeOrganizacao = nomeOrganizacao;
    }
    if (email) {
      parceiro.email = email;
    }
    if (endereco) {
      parceiro.endereco = endereco;
    }
    if (cidade) {
      parceiro.cidade = cidade;
    }
    if (horariosFuncionamento) {
      parceiro.horariosFuncionamento = horariosFuncionamento;
    }
    if (possuiParceiros) {
      parceiro.possuiParceiros = possuiParceiros;
    }

    await parceiro.save();

    return res.json({ message: 'parceiro atualizado' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
