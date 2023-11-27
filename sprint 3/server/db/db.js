const Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config({path:path.join(__dirname,'../.env')});

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize(process.env.db_name, process.env.db_user, process.env.db_password, {
  host: process.env.db_host,
  dialect: 'mysql', 
  port: process.env.db_port,
});

// Definição do modelo da tabela "estabelecimento"
const Estabelecimento = sequelize.define('Estabelecimento', {
  nomeOrganizacao: Sequelize.STRING,
  cnpj: Sequelize.STRING,
  email: Sequelize.STRING,
  endereco: Sequelize.STRING,
  cidade: Sequelize.STRING,
  horariosFuncionamento: Sequelize.STRING,
  oleoUsado: Sequelize.FLOAT,
  oleoNovo: Sequelize.FLOAT,
  senha: Sequelize.STRING,
  credito:Sequelize.FLOAT,
  compras:Sequelize.FLOAT,
  oleoCedido:Sequelize.FLOAT,
  token: {
    type: Sequelize.STRING,
    allowNull: true
  },
  emailConfirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

// Definição do modelo da tabela "parceiros"
const Parceiro = sequelize.define('Parceiro', {
  nomeOrganizacao: Sequelize.STRING,
  //cpf: Sequelize.STRING,
  email: Sequelize.STRING,
  endereco: Sequelize.STRING,
  cidade: Sequelize.STRING,
  cpf: Sequelize.STRING,
  horariosFuncionamento: Sequelize.STRING,
  credito:Sequelize.FLOAT,
  senha: Sequelize.STRING,
  compras:Sequelize.FLOAT,
  litrosColetados:Sequelize.FLOAT,
  token: {
    type: Sequelize.STRING,
    allowNull: true
  },
  emailConfirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  
});

const OleoInfo = sequelize.define('Oleoinfo', {
  preco: Sequelize.FLOAT,
  tipo: Sequelize.STRING,
})


const VinculoParceiroEstabelecimento = sequelize.define('VinculoParceiroEstabelecimento', {
});




const Administrador = sequelize.define("Administrador", {
  nome: Sequelize.STRING,
  email:Sequelize.STRING,
  senha:Sequelize.STRING,
 
});



// Definição do modelo da tabela "coleta"
const Coleta = sequelize.define('Coleta', {
  quantidade: Sequelize.FLOAT,
  tipo:Sequelize.STRING,
  credito:Sequelize.FLOAT,
});

const Credito = sequelize.define('Credito', {
  credito: Sequelize.FLOAT,
  valor: Sequelize.FLOAT,
});
Credito.belongsTo(Parceiro, { foreignKey: 'ParceiroId' });


// Definição do modelo da tabela "óleos"
const Oleo = sequelize.define('Oleo', {
  preco: Sequelize.FLOAT,
  tipo:Sequelize.STRING,
});

const Compra = sequelize.define('Compra', {
  produtos: {
    type: Sequelize.JSON, // Armazenará os detalhes dos produtos comprados
    allowNull: false,
  },
  total: {
    type: Sequelize.FLOAT, // Total da compra
    allowNull: false,
  },
  tipo: {
    type: Sequelize.STRING, // Armazenará os detalhes dos produtos comprados
    allowNull: false,
  },
  EstabelecimentoId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Parceiro.hasMany(Credito);
Estabelecimento.hasMany(Coleta);
Parceiro.hasMany(Coleta);
Coleta.belongsTo(Estabelecimento);
Coleta.belongsTo(Parceiro);
Parceiro.belongsToMany(Estabelecimento, { through: VinculoParceiroEstabelecimento });
Estabelecimento.belongsToMany(Parceiro, { through: VinculoParceiroEstabelecimento });


const syncDB = async () => {
    await Estabelecimento.sync({ force: false });
    await Parceiro.sync({ force: false});
    await Coleta.sync({ force: false});
    await Compra.sync({ force: false});
    await Credito.sync({ force: false});
    await Administrador.sync({force:false});
    await OleoInfo.sync({force: false});
    await Oleo.sync({force:false});
    await VinculoParceiroEstabelecimento.sync({force:false});
    console.log("database synchronized");
 };

 const createDefaultAdmins = async () => {
  const admin1 = await Administrador.findOrCreate({
    where: { nome: "PEDRO" },
    defaults: { email: "pedro@ADM.com", senha: "123123123" }
  });

  const admin2 = await Administrador.findOrCreate({
    where: { nome: "DEBORA" },
    defaults: { email: "debora@ADM.com", senha: "123123123" }
  });

  const admin3 = await Administrador.findOrCreate({
    where: { nome: "BRENER" },
    defaults: { email: "brener@ADM.com", senha: "123123123" }
  });

  console.log("Dados dos administradores criados:", admin1, admin2, admin3);
};

// Chamar a função para criar os administradores somente se não existirem
createDefaultAdmins();

   
 syncDB();  
 
 module.exports = { sequelize, Estabelecimento, OleoInfo, VinculoParceiroEstabelecimento, Parceiro, Coleta, Compra, Credito, Administrador, Oleo };
 
 sequelize.authenticate()
   .then(() => {
     console.log('Connection has been established successfully.');
   })
   .catch((error) => {
     console.error('Unable to connect to the database:', error);
   });
