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
  email: Sequelize.STRING,
  endereco: Sequelize.STRING,
  cidade: Sequelize.STRING,
  horariosFuncionamento: Sequelize.STRING,
  possuiParceiros: Sequelize.STRING,
  senha: Sequelize.STRING,
  credito:Sequelize.FLOAT,
});

// Definição do modelo da tabela "parceiros"
const Parceiro = sequelize.define('Parceiro', {
  nomeOrganizacao: Sequelize.STRING,
  email: Sequelize.STRING,
  endereco: Sequelize.STRING,
  cidade: Sequelize.STRING,
  horariosFuncionamento: Sequelize.STRING,
  possuiParceiros: Sequelize.STRING,
  senha: Sequelize.STRING,
});


// Definição do modelo da tabela "coleta"
const Coleta = sequelize.define('Coleta', {
  quantidade: Sequelize.FLOAT,
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
  EstabelecimentoId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Estabelecimentos', // Nome da tabela de estabelecimentos
      key: 'id',
    },
  },
});


Estabelecimento.hasMany(Coleta);
Parceiro.hasMany(Coleta);
Coleta.belongsTo(Estabelecimento);
Coleta.belongsTo(Parceiro);
Estabelecimento.hasMany(Compra);
Compra.belongsTo(Estabelecimento);




const syncDB = async () => {
    await Estabelecimento.sync({ force: false });
    await Parceiro.sync({ force: false});
    await Coleta.sync({ force: false});
    await Compra.sync({ force: false});
    
    console.log("database synchronized");
 };
   
 syncDB();
 
 module.exports = { sequelize, Estabelecimento, Parceiro, Coleta, Compra};
 
 sequelize.authenticate()
   .then(() => {
     console.log('Connection has been established successfully.');
   })
   .catch((error) => {
     console.error('Unable to connect to the database:', error);
   });
