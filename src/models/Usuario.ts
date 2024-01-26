import { DataTypes } from "sequelize"
import { Column, HasMany, Model, Table } from "sequelize-typescript"
import PontoModel from "./Ponto"

@Table({ tableName: "usuarios", timestamps: false })
class UsuarioModel extends Model {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number
  @Column({ type: DataTypes.STRING })
  declare nome: string
  @Column({ type: DataTypes.STRING })
  declare cargo: string
  @Column({ type: DataTypes.STRING })
  declare nome_de_usuario: string
  @Column({ type: DataTypes.STRING })
  declare email: string
  @Column({ type: DataTypes.STRING })
  declare senha: string
  @Column({ type: DataTypes.STRING })
  declare celular: string
  @Column({ type: DataTypes.STRING })
  declare criado_em: string
  @Column({ type: DataTypes.INTEGER })
  declare e_admin: number
  @Column({ type: DataTypes.INTEGER })
  declare ativo: number

  @HasMany(() => PontoModel)
  declare pontos: PontoModel[]
}

export default UsuarioModel
