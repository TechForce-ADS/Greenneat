const Sequelize = require('sequelize');

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize('greenneat', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', 
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
});

// Definição do modelo da tabela "parceiros"
const Parceiros = sequelize.define('Parceiros', {
  nomeOrganizacao: Sequelize.STRING,
  email: Sequelize.STRING,
  endereco: Sequelize.STRING,
  cidade: Sequelize.STRING,
  horariosFuncionamento: Sequelize.STRING,
  possuiParceiros: Sequelize.STRING,
  senha: Sequelize.STRING,
});

//const syncDB = async () => {
    //await Estabelecimento.sync({ force: true });
    //await Parceiros.sync({ force: true});
    //console.log("database synchronized");
 //};
   
 //syncDB();
 
 module.exports = { sequelize, Estabelecimento, Parceiros};
 
 sequelize.authenticate()
   .then(() => {
     console.log('Connection has been established successfully.');
   })
   .catch((error) => {
     console.error('Unable to connect to the database:', error);
   });
