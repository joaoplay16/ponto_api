const Sequelize = require("sequelize")
const dbConfig = require("../config/database")

const connection = new Sequelize(dbConfig)

connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados bem-sucedida.")
  })
  .catch((err: Error) => {
    console.error("Erro ao conectar ao banco de dados:", err)
  })

module.exports = connection
