const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;
app.get('/',function (req,res){
    res.sendFile("/home/nathan/AtividadeREDIS2/AtividadeREDIS/html/cadastro.html")
})
app.get('/cadastro',function (req,res){
    res.sendFile("/home/nathan/AtividadeREDIS2/AtividadeREDIS/html/cadastro.html")
})
app.get('/login',function (req,res){
    res.sendFile('/home/nathan/AtividadeREDIS2/AtividadeREDIS/html/login.html')
})
app.get('/timeline', function(req,res){
    res.sendFile("/home/nathan/AtividadeREDIS2/AtividadeREDIS/html/timeline.html")
})

const db = require('./database/database');
const rd= require('./redis/redis')


app.post('/redis', rd.setRedis);


app.post('/entrar',db.login);

app.post('/salvar', db.addPessoaBanco);

app.post('/getPonto', db.getPonto);

app.post('/getRascunho', rd.getRedis)

app.get('/main', function (req,res) {
    res.sendFile("/home/nathan/AtividadeREDIS2/AtividadeREDIS/assets/js/main.js")
})

// app.get('/rascunho', rd.getRedis);
app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});