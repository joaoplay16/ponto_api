const Sequelize = require("sequelize")
const dbConfig = require("../config/database")

const Usuario = require("../models/Usuario")
const Ponto = require("../models/Ponto")

const connection = new Sequelize(dbConfig)

connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados bem-sucedida.")
  })
  .catch((err: Error) => {
    console.error("Erro ao conectar ao banco de dados:", err)
  })

Usuario.init(connection)
Ponto.init(connection)

Usuario.associate(connection.models)
Ponto.associate(connection.models)

module.exports = connection
