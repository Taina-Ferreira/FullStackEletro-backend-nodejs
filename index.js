const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
var bodyParser = require('body-parser');


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
            res.send(error)
        } else {
            res.send('inserido',200);
        }
    });
});

app.get('/produtos', (req,res) => {
    const sql = `select * from tb_produtos where length(imagem) > 15`;
    
    connection.query(sql, (error, result) => {
        if (error) {
            res.send(error)
        } else {
            res.send(result);
        }
    });
});

app.get('/categorias', (req,res) => {
    const sql = `select id_categoria,categoria from tb_categoria_produtos`;

    connection.query(sql, (error, result) => {
        if (error) {
            res.send(error,400)
        } else {
            res.send(result,200);
        }
    });
});


app.listen(4000,() => console.log('servidor rodando'));
