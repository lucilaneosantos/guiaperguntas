const Sequelize = require("sequelize");
const connection = new Sequelize('guiaperguntas','root','25909025',{
    host:'localhost',
    dialect:'mysql'
});

module.exports  = connection;