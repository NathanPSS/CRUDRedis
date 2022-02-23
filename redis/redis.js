require("dotenv").config()
const Redis = require('ioredis')
const {request,response} = require("express")

const client = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST
})
const setRedis = 

async (request,response) => {
  
const {id,areatexto} = request.body
 
 const result =  await client.set(id, `${areatexto}`,'EX',7200);

  response.send(result)
};
const getRedis = async (request,response) => {
  const {id} = request.body
     const result =  {areatexto: await client.get(id)}
    
      response.send(result)
    }
module.exports = {
    setRedis,
    getRedis
}