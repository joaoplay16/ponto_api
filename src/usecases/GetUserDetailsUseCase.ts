import ApiRequestError from "../errors/ApiRequestError"
import DatabaseOperationError from "../errors/DatabaseOperationError"
import UserRepository from "../repository/UserRepository"
import Usuario from "../types/usuario"

class GetUserDetailsUseCase {
  userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async findUserById(id?: string): Promise<Usuario> {
    if (id === undefined || !/\d+$/.test(id)) {
      throw new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    }

    const user = await this.userRepository.findUserById(parseInt(id))

    if (user == null) {
      throw new DatabaseOperationError(404, "Nenhum usuário encontrado")
    } else {
      return Promise.resolve(user)
    }
  }
}

export default GetUserDetailsUseCase
