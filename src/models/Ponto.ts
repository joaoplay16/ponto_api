import { type ModelAttributes, type Sequelize } from "sequelize"

const { Model } = require("sequelize")

import { DataTypes } from "sequelize"

class Ponto extends Model {
  static init(sequelize: Sequelize) {
    super.init(
      {
        data: DataTypes.DATEONLY,
        hora_entrada: DataTypes.TIME,
        hora_saida: DataTypes.TIME,
      },
      {
        sequelize,
        timestamps: false
      }
    )
  }

  static associate(models: ModelAttributes) {
    this.belongsTo(models.Usuario, { foreignKey: "usuario_id", as: "usuario" })
  }
}

module.exports = Ponto
