import "dotenv/config"
import jwt, { Secret } from "jsonwebtoken"
import ApiRequestError from "../errors/ApiRequestError"
import UserRepository from "../repository/UserRepository"
import HashService from "../service/HashService"

class PasswordResetUsecase {
  userRepository: UserRepository
  hashService: HashService

  constructor(userRepository: UserRepository, hashService: HashService) {
    this.userRepository = userRepository
    this.hashService = hashService
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

    const jwtSecretKey: Secret = process.env.JWT_SECRET_KEY || ""

    try {
      const decoded = jwt.verify(token, jwtSecretKey)
      if (decoded) {
        const { email } = decoded as { email: string }

        var passwordHash = ""

        passwordHash = this.hashService.hashSync(password)

        let user = await this.userRepository.findUserByEmail(email)

        if (user) {
          user.senha = passwordHash
          await this.userRepository.update(user)
        } else {
          throw new ApiRequestError(404, "Este email não está cadastrado")
        }
      }
    } catch (err: unknown) {
      if (
        err instanceof Error &&
        ["JsonWebTokenError", "TokenExpiredError"].includes(err.name)
      ) {
        throw new ApiRequestError(401, "Token inválido ou expirado.")
      }
      throw err
    }
  }
}

export default PasswordResetUsecase
