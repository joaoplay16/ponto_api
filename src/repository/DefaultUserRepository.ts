import UsuarioModel from "../models/Usuario"
import Usuario from "../types/usuario"
import UserRepository from "./UserRepository"

class DefaultUserRepository implements UserRepository {
  async findUserByEmail(email: string): Promise<Usuario | null> {
    return await UsuarioModel.findOne({
      where: { email: email },
      raw: true,
    })
  }
}

export default DefaultUserRepository