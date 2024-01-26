import { Sequelize } from "sequelize-typescript"
import dbConfig from "../config/database"
import "dotenv/config"

import PontoModel from "../models/Ponto"
import UsuarioModel from "../models/Usuario"
const connection = new Sequelize(dbConfig)

connection
  .authenticate()
  .then(() => {
    connection.addModels([UsuarioModel, PontoModel])
    console.log("Conexão com o banco de dados bem-sucedida.")
  })
  .catch((err: Error) => {
    console.error("Erro ao conectar ao banco de dados:", err)
  })

export default connection
