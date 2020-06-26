const express =  require("express");
const app = express();
const bodyParser =require("body-parser");
const connection =  require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta  = require("./database/Resposta");


//database
connection
    .authenticate()
    .then(()=>{
        	console.log("Conexao Feita com o banco de dados");
    })
    .catch((msqErro)=>{
        console.log(msqErro);
    })

// express para usar motor ejs html
app.set('view engine','ejs');
//carregar arquivos css/javascript/img
app.use(express.static('public'));
//responsavel por receber os dados do formulario
app.use(express.urlencoded({extended: false}));
//lendo dados de API
app.use(bodyParser.json());
//definindo rotas
app.get("/",(req,res)=>{
    //buscar no banco com  crua e accionando ordem
    Pergunta.findAll({raw:true,order:[
        ['id','DESC']//ASC=CRESCENTE DESC=DESCRENTE
    ]}).then(Pergunta=>{
        //renderizando html e passando os valores da variaveis para acesso frontend
    res.render("index",{
            pergunta:Pergunta
        });
    });
    
    
});

app.get("/perguntar",(req,res)=>{
        res.render("perguntar")
});
//recebendo dados do formulario
app.post("/salvarpergunta",(req,res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //salvando os dados na tabela
    Pergunta.create({
        titulo: titulo,
        descricao:descricao
    }).then(()=>{
        //redirecionando para pagina principal
        res.redirect("/");
    });
   // testando
});


app.get("/pergunta/:id",(req,res)=>{
    var id =req.params.id;
    //buscar apenas um dado no banco
    Pergunta.findOne({
        where:{id:id}

    }).then(pergunta =>{
        if(pergunta!=undefined){//achar a pergunta
            Resposta.findAll({

                where:{perguntaId:pergunta.id},
                order:[['id','DESC']]
            }).then(resposta=>{
                res.render("pergunta",{
                    pergunta:pergunta,
                    respostas: resposta
                });

            });
        }else{//nao foi encontrada
            res.redirect("/");
        }
    });
});

app.post("/responder",(req,res)=>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo:corpo,
        perguntaId: perguntaId
    }).then(()=>{
        //redirecionando para pagina pergunta
        res.redirect("/pergunta/"+perguntaId);
    });
});

app.listen(8080,()=>{
    console.log("App Rodando!");
});