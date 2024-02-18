import ApiRequestError from "../errors/ApiRequestError"
import UserRepository from "../repository/UserRepository"
import HashService from "../service/HashService"

class FinishUserRegisterUseCase {
  hashService: HashService
  userRepository: UserRepository

  constructor(userRepository: UserRepository, hashService: HashService) {
    this.hashService = hashService
    this.userRepository = userRepository
  }

  async finishRegister(username?: string, password?: string): Promise<void> {
    if (!username || !password) {
      throw new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    }

    var passwordHash = ""

    if (password?.length >= 8) {
      passwordHash = this.hashService.hashSync(password)
    } else {
      throw new ApiRequestError(400, "A senha deve ter 8 ou mais caracteres.")
    }

    let user = await this.userRepository.findUserByUsername(username)

    if (!user) {
      throw new ApiRequestError(404, "Usuário não encontrado")
    }

    if (user.senha) {
      throw new ApiRequestError(409, "O cadastro já foi finalizado")
    }

    user.senha = passwordHash

    return await this.userRepository.update(user)
  }
}

export default FinishUserRegisterUseCase
