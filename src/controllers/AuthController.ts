import { type Request, type Response } from "express"
import AuthError from "../errors/AuthError"
import DefaultUserRepository from "../repository/DefaultUserRepository"
import AuthUseCase from "../usecases/AuthUseCase"
import BcryptHashService from "../service/BcryptHashService"

const AuthController = {
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body

      const authUseCase = new AuthUseCase(
        new DefaultUserRepository(),
        new BcryptHashService()
      )

      const usuario = await authUseCase.authenticate(email, senha)

      res.json(usuario)
    } catch (error) {
      if (error instanceof AuthError) {
        return res.status(error.statusCode).json(error)
      }
      console.error("Erro interno do servidor", error)
      res.status(500).json({ error: "Erro interno do servidor" })
    }
  },

  async logout(req: Request, res: Response): Promise<void> {
    try {
      req.session.destroy(function (err) {
        if (err)
          return res.status(500).json({ error: "Erro interno do servidor" })
      })
      res.status(200).send()
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor" })
    }
  },
}

export default AuthController
