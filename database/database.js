require('dotenv').config();

const { request } = require('express');
const {Client} = require('pg');
const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});



client.connect()
    .then(()=> console.log('Conectado!'))
    .catch(err => console.log(err.stack));

const addPessoaBanco = (request, response) =>{
    const {nome,email,password} = request.body;
    
    
    const query = `INSERT INTO pessoa (nome,email,id,senha) VALUES ('${nome}','${email}','${Math.floor(Math.random() * 65536)}','${password}')`;

    client.query(query,(error, results) => {
            if(error){
                response.status(400).send(error);
                console.log(error);
                return;
            }
            response.status(200).send('Inserido');
        });
};
const getPonto = (request, response) =>{
    const {nome} = request.body;

    const query = `SELECT id,nome,descricao,valor,avaliacao, ST_AsText (localizacao) AS localizacao from locais_de_encontro where nome='${nome}'`;

    client.query(query,(error, results) => {
            if(error){
                response.status(400).send(error);
                console.log(error);
                return;
            }
            return response.status(200).json(results.rows);
        });
};
const login = (request, response) =>{
    const {email,password} = request.body;
    
    const query = `SELECT id FROM pessoa WHERE email='${email}' AND senha='${password}'`;
    client.query(query,(error, results) => {
        if(error){
            response.status(400).send(error);
            console.log(error);
            return;
        }
    return response.status(200).json(results.rows);
});
}
module.exports = {
    addPessoaBanco,
    getPonto,
    login
};