import { type ModelAttributes, type Sequelize } from "sequelize"

const { Model } = require('sequelize');

import { DataTypes } from "sequelize";

class Usuario extends Model {
  static init(sequelize: Sequelize) {
    super.init({
      nome: DataTypes.STRING,
      nome_de_usuario: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      celular: DataTypes.STRING,
      e_admin: DataTypes.INTEGER,
    }, {
      sequelize,
      timestamps: false
    })
  }

  static associate(models: ModelAttributes) {
    this.hasMany(models.Ponto, { foreignKey: "usuario_id", as: "pontos" })
  }
}

module.exports = Usuario;