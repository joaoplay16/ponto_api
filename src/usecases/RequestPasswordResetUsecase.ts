import "dotenv/config"
import jwt from "jsonwebtoken"
import ApiRequestError from "../errors/ApiRequestError"
import UserRepository from "../repository/UserRepository"
import MailingService from "../service/MailingService"
import { generatePasswordRedefinitionTemplate, isEmail } from "../util/email"

class RequestPasswordResetUsecase {
  userRepository: UserRepository
  mailingService: MailingService

  constructor(userRepository: UserRepository, mailingService: MailingService) {
    this.userRepository = userRepository
    this.mailingService = mailingService
  }

  async sendRecoveryEmail(email?: string): Promise<void> {
    if (!email) {
      throw new ApiRequestError(
        400,
        "Requisição inválida. Verifique os parâmetros fornecidos."
      )
    }

    if (!isEmail(email)) {
      throw new ApiRequestError(400, "Informe um e-mail válido.")
    }

    let user = await this.userRepository.findUserByEmail(email)

    if (!user) {
      throw new ApiRequestError(404, "Este email não está cadastrado")
    }
    /* c8 ignore next */
    const jwtSecretKey = process.env.JWT_SECRET_KEY || ""

    const token = jwt.sign({ email }, jwtSecretKey, { expiresIn: "20m" })

    return this.mailingService.sendMail({
      to: email,
      subject: "EmPonto - Redefinição de senha",
      html: generatePasswordRedefinitionTemplate(
        user.nome,
        `${process.env.PASSWORD_CHANGE_URL}?token=${token}`
      ),
    })
  }
}

export default RequestPasswordResetUsecase
