import DatabaseOperationError from "../errors/DatabaseOperationError"
import UsuarioModel from "../models/Usuario"
import Usuario, { UsersQueryResult } from "../types/usuario"
import UserRepository from "./UserRepository"

class DefaultUserRepository implements UserRepository {
  async create(user: Usuario): Promise<Usuario> {
    try {
      return await UsuarioModel.create(user)
    } catch (error: any) {
      if (error.original.code == "ER_DUP_ENTRY") {
        switch (error.errors[0].path) {
          case "nome_de_usuario":
            throw new DatabaseOperationError(
              409,
              "Este nome de usuário já foi cadastrado"
            )
          case "email":
            throw new DatabaseOperationError(
              409,
              "O endereço de e-mail já foi cadastrado"
            )
        }
      }
      throw error
    }
  }

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
