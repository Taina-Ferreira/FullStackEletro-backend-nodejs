const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
var bodyParser = require('body-parser');

const Mensagem = require('./mongodb');

var app = express();
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(cors());

const credencial = {
    host: "localhost",
    user: "root",
    password: "",
    database: "db_fullstackeletro",
    port: 3306
}


const connection = mysql.createConnection(credencial);

app.get("/", (req,res) => {
    res.send("Bem vindo usuário")
});

app.post('/produtos', (req,res) => {

    const {id_categoria, nome_produto, descricao, preco, preco_com_desconto, imagem} = req.body;

    if (!imagem){
        imagem = ''
    }

    const sql = `insert into tb_produtos (id_categoria, nome_produto, descricao, preco, preco_com_desconto, imagem) values (${id_categoria}, '${nome_produto}', '${descricao}', ${preco}, ${preco_com_desconto}, '${imagem}')`;

    connection.query(sql, (error, result) => {
        if (error) {
            res.status(400).send(error)
        } else {
            res.status(200).send('inserido');
        }
    });
});

app.get('/produtos', (req,res) => {
    const sql = `select * from tb_produtos where length(imagem) > 15`;
    
    connection.query(sql, (error, result) => {
        if (error) {
            res.status(400).send(error)
        } else {
            res.status(200).send(result);
        }
    });
});

app.get('/categorias', (req,res) => {
    const sql = `select id_categoria,categoria from tb_categoria_produtos`;

    connection.query(sql, (error, result) => {
        if (error) {
            res.status(400).send(error)
        } else {
            res.status(200).send(result);
        }
    });
});


app.get('/mensagem', async (req,res) => {
    try {
        const mensagens = await Mensagem.find();
        res.status(200).send(mensagens)
    } catch (err) {
        res.status(400).send({error:err})
    }
});

app.post('/mensagem', async (req,res) => {
    try {
        const mensagem = new Mensagem(req.body).save()
        .then(
            () => res.status(200).send(mensagem)
        )
        .catch(
            async () => res.status(400).send({error: "Não foi possivel inserir"})    
        )

        res.status(200).send(mensagem)

    } catch (err) {
        res.status(400).send({error:err})
    }
});



app.listen(4000,() => console.log('servidor rodando'));
