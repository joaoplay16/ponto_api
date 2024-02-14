import UsuarioModel from "../models/Usuario"
import Usuario, { UsersQueryResult } from "../types/usuario"
import UserRepository from "./UserRepository"

class DefaultUserRepository implements UserRepository {
  async findUserById(id: number): Promise<Usuario | null> {
    return await UsuarioModel.findByPk(id)
  }
  async getUsers(
    cargo: string,
    limit: number,
    offset: number
  ): Promise<UsersQueryResult> {
    return await UsuarioModel.findAndCountAll({
      where: { cargo },
      limit: limit,
      offset: offset,
      order: [["nome", "ASC"]],
      raw: true,
    })
  }
  async findUserByEmail(email: string): Promise<Usuario | null> {
    return await UsuarioModel.findOne({
      where: { email: email },
      raw: true,
    })
  }
}

export default DefaultUserRepository
