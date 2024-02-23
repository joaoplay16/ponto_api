import { SequelizeScopeError } from "sequelize"
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

  async update(user: Usuario): Promise<void> {
    try {   
      let affectedCount = await UsuarioModel.update(user, {
        where: { id: user?.id },
      })
      if (affectedCount[0] > 0) {
        return Promise.resolve()
      } else {
        console.log(user);
        throw new DatabaseOperationError(500, "Falha ao atualizar usuário")
      }
    } catch (error: any) {
      if (error?.original?.code == "ER_DUP_ENTRY") {
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

  async findUserByUsername(username: string): Promise<Usuario | null> {
    return await UsuarioModel.findOne({
      where: { nome_de_usuario: username },
      raw: true
    })
  }

  async findUserById(id: number): Promise<Usuario | null> {
    return await UsuarioModel.findByPk(id, { raw: true })
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
