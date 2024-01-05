import { type Application } from "express"
var express = require("express"),
  config = require("./server/configure"),
  app: Application = express()
  require('dotenv').config();

const dbConfig = require('./config/database');
const Sequelize = require('sequelize');


app = config(app)

app.set("port", process.env.PORT || 8088)

const connection = new Sequelize(dbConfig);

connection
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida.');
  })
  .catch((err: Error) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

app.listen(app.get("port"), function () {
  console.log("Server up: http://localhost:" + app.get("port"))
})
