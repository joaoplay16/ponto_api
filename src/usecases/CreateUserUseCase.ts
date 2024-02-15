import { isEmail } from "../util/email"
import ApiRequestError from "../errors/ApiRequestError"
import UserRepository from "../repository/UserRepository"
import Usuario from "../types/usuario"

class CreateUserUseCase {
  userRepository: UserRepository

  constructor(repository: UserRepository) {
    this.userRepository = repository
  }

  async save(user: Usuario): Promise<Usuario | null>{

    const { nome, email, nome_de_usuario, celular } = user

    if (
      ![nome, email, nome_de_usuario, celular].every(
        (campo) => campo && campo.length > 0
      )
    ) {
      throw new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    }

    if(!isEmail(email)){
      throw new ApiRequestError(
        400,
        "Informe um e-mail válido."
      )
    }

    const createdUser = await this.userRepository.create(user)

    return createdUser
  }
}

export default CreateUserUseCase
