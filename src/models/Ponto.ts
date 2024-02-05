import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey
} from "sequelize-typescript"

import { DataTypes } from "sequelize"
import UsuarioModel from "./Usuario"

@Table({ tableName: "pontos", timestamps: false })
class PontoModel extends Model {
   @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number
  @Column({ type: DataTypes.STRING })
  declare data: string
  @Column({ type: DataTypes.STRING })
  declare hora_entrada: string
  @Column({ type: DataTypes.STRING })
  declare hora_saida: string

  @ForeignKey(() => UsuarioModel)
  @Column({ type: DataTypes.INTEGER })
  declare usuario_id: number

  @BelongsTo(() => UsuarioModel)
  declare usuario: UsuarioModel
}

export default PontoModel
