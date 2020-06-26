const Sequelize  =  require("sequelize");
const connection = require('./database');

//definido tabela com siquelize/model
const Resposta = connection.define('respostas',{
    corpo:{//tipo de dados para criação no banco
        type:Sequelize.TEXT,
        //obrigatoriedade do campo 
        allownull:false
    },
    perguntaId:{
        type:Sequelize.INTEGER,
        allownull: false
    }

});
//sicronizar com o banco de dados
Resposta.sync({force:false}).then(()=>{
    console.log("tabela criada resposta");
});

module.exports = Resposta;