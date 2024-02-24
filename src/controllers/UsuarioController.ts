import "dotenv/config"
import { type Request, type Response } from "express"
import ApiRequestError from "../errors/ApiRequestError"
import DatabaseOperationError from "../errors/DatabaseOperationError"
import DefaultUserRepository from "../repository/DefaultUserRepository"
import BcryptHashService from "../service/BcryptHashService"
import GmailService from "../service/GmailService"
import JwtTokenService from "../service/JwtTokenService"
import { default as Usuario, default as UsuarioType } from "../types/usuario"
import CreateUserUseCase from "../usecases/CreateUserUseCase"
import FinishUserRegisterUseCase from "../usecases/FinishUserRegisterUseCase"
import GetUserDetailsUseCase from "../usecases/GetUserDetailsUseCase"
import GetUsersUseCase from "../usecases/GetUsersUseCase"
import PasswordResetUsecase from "../usecases/PasswordResetUsecase"
import RequestPasswordResetUsecase from "../usecases/RequestPasswordResetUsecase"
import UpdateUserUseCase from "../usecases/UpdateUserUseCase"
import { generateUserRegisterTemplate } from "../util/email"

const UsuarioController = {
  async index(req: Request, res: Response): Promise<void> {
    try {
      const { limit, offset, cargo } = req.query

      const usecase = new GetUsersUseCase(new DefaultUserRepository())

      const usuarios = await usecase.find(
        cargo as string,
        limit as string,
        offset as string
      )

      res.json(usuarios)
    } catch (error: unknown) {
      console.error("Erro ao buscar usuários:", error)
      if (error instanceof DatabaseOperationError) {
        res.status(error.statusCode).json({ error: error.errorMessage })
        return
      }
      res.status(500).json({ error: "Erro interno do servidor" })
    }
  },

  async details(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const getUserDetailsUseCase = new GetUserDetailsUseCase(
        new DefaultUserRepository()
      )

      var result = await getUserDetailsUseCase.findUserById(id)
      if (result != null) {
        const { senha, ...usuarioSemASenha }: Usuario = result

        res.json(usuarioSemASenha)
      } else {
        res.status(404).json({ error: "Usuário não encontrado" })
      }
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor" })
    }
  },

  async save(req: Request, res: Response): Promise<void> {
    try {
      const usuarioInfo: UsuarioType = req.body

      const createUserUseCase = new CreateUserUseCase(
        new DefaultUserRepository()
      )

      const novoUsuario: UsuarioType = usuarioInfo

      const usuarioCriado = await createUserUseCase.save(novoUsuario)

      res.json(usuarioCriado)

      new GmailService().sendMail({
        to: novoUsuario.email,
        subject: "EmPonto - Continue seu cadastro",
        html: generateUserRegisterTemplate(
          novoUsuario.nome,
          `${process.env.USER_REGISTRATION_URL}?usuario=${novoUsuario.nome_de_usuario}`
        ),
      })
    } catch (error: unknown) {
      if (error instanceof ApiRequestError) {
        res.status(error.statusCode).json({ error: error.errorMessage })
        return
      }

      if (error instanceof DatabaseOperationError) {
        res.status(error.statusCode).json({ error: error.errorMessage })
        return
      }

      res.status(500).json({ error: "Erro interno do servidor" })
    }
  },

  // Define a senha do usuário pré-registrado
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { usuario: username, senha: password } = req.body

      const finishUserRegisterUsecase = new FinishUserRegisterUseCase(
        new DefaultUserRepository(),
        new BcryptHashService()
      )

      await finishUserRegisterUsecase.finishRegister(username, password)

      res.send()
    } catch (error: unknown) {
      if (
        error instanceof ApiRequestError ||
        error instanceof DatabaseOperationError
      ) {
        res.status(error.statusCode).json({ error: error.errorMessage })
        return
      }

      res.status(500).json({ error: "Erro interno do servidor", info: error })
    }
  },

  async sendPasswordRecoveryEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.query

      const requestPasswordResetUsecase = new RequestPasswordResetUsecase(
        new DefaultUserRepository(),
        new GmailService()
      )

      await requestPasswordResetUsecase.sendRecoveryEmail(email as string)

      res.send()
    } catch (error: unknown) {
      if (
        error instanceof ApiRequestError ||
        error instanceof DatabaseOperationError
      ) {
        res.status(error.statusCode).json({ error: error.errorMessage })
        return
      }

      res.status(500).json({ error: "Erro interno do servidor", info: error })
    }
  },

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token, senha } = req.body

      const passwordResetUsecase = new PasswordResetUsecase(
        new DefaultUserRepository(),
        new BcryptHashService(),
        new JwtTokenService()
      )

      await passwordResetUsecase.resetPassword(token, senha)
      
      res.send()
    } catch (error: unknown) {
      if (
        error instanceof ApiRequestError ||
        error instanceof DatabaseOperationError
      ) {
        res.status(error.statusCode).json({ error: error.errorMessage })
        return
      }
      res.status(500).json({ error: "Erro interno do servidor" })
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id_usuario } = req.params
      const usuario: Usuario = req.body

      const updateUserUsecase = new UpdateUserUseCase(
        new DefaultUserRepository(),
        new BcryptHashService()
      )

      await updateUserUsecase.update({ ...usuario, id: Number(id_usuario) })

      res.send()
    } catch (error: unknown) {
      if (
        error instanceof ApiRequestError ||
        error instanceof DatabaseOperationError
      ) {
        res.status(error.statusCode).json({ error: error.errorMessage })
        return
      }
      res.status(500).json({ error: "Erro interno do servidor" })
    }
  },
}

export default UsuarioController
