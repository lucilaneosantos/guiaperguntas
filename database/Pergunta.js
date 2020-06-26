const Sequelize  =  require("sequelize");
const connection = require('./database');

//definido tabela com siquelize/model
const Pergunta = connection.define('pergunta',{
    titulo:{
        type:Sequelize.STRING,
        allownull:false
    },
    descricao:{
        type:Sequelize.TEXT,
        allownull: false
    }

});
//sicronizar com o banco de dados
Pergunta.sync({force:false}).then(()=>{
    console.log("tabela criada pergunta");
});

module.exports = Pergunta;