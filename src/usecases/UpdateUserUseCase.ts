import ApiRequestError from "../errors/ApiRequestError"
import UserRepository from "../repository/UserRepository"
import HashService from "../service/HashService"
import Usuario from "../types/usuario"
import { isEmail } from "../util/email"

class UpdateUserUseCase {
  private userRepository: UserRepository
  private hashService: HashService

  constructor(repository: UserRepository, hashService: HashService) {
    this.userRepository = repository
    this.hashService = hashService
  }

  async update(user: Partial<Usuario>): Promise<void> {
    const {
      nome,
      email,
      cargo,
      nome_de_usuario,
      celular,
      senha,
      ativo,
      e_admin,
    } = user

    if (
      ![nome, email, senha, cargo, nome_de_usuario, celular].every(
        (campo) => campo && campo.length > 0
      )
    ) {
      throw new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    }

    if (ativo === undefined || e_admin === undefined) {
      throw new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    }

    if (!isEmail(email!)) {
      throw new ApiRequestError(400, "Informe um e-mail válido.")
    }

    var passwordHash = ""

    if (senha!.length >= 8) {
      passwordHash = this.hashService.hashSync(senha!)
    } else {
      throw new ApiRequestError(400, "A senha deve ter 8 ou mais caracteres.")
    }

    const updatedUser = {
      ...user,
      ...(passwordHash && { senha: passwordHash }),
    }

    return await this.userRepository.update(updatedUser as Usuario)
  }
}

export default UpdateUserUseCase
