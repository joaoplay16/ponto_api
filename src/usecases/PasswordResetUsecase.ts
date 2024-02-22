import "dotenv/config"
import ApiRequestError from "../errors/ApiRequestError"
import UserRepository from "../repository/UserRepository"
import HashService from "../service/HashService"
import TokenService from "../service/TokenService"
import { isEmail } from "../util/email"

class PasswordResetUsecase {
  userRepository: UserRepository
  hashService: HashService
  tokenService: TokenService

  constructor(
    userRepository: UserRepository,
    hashService: HashService,
    tokenService: TokenService
  ) {
    this.userRepository = userRepository
    this.hashService = hashService
    this.tokenService = tokenService
  }

  async resetPassword(token?: string, password?: string): Promise<void> {
    if (!token || !password) {
      throw new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    }

    if (password.length < 8) {
      throw new ApiRequestError(400, "A senha deve ter 8 ou mais caracteres.")
    }

    const decoded = this.tokenService.verify(token)

    const { email } = decoded as { email: string }
    
    if (email && isEmail(email)) {
      var passwordHash = ""

      passwordHash = this.hashService.hashSync(password)

      let user = await this.userRepository.findUserByEmail(email)

      if (user) {
        user.senha = passwordHash
        await this.userRepository.update(user)
      } else {
        throw new ApiRequestError(404, "Este email não está cadastrado")
      }
    }else{
      throw new ApiRequestError(400, "E-mail inválido")
    }
  }
}

export default PasswordResetUsecase
