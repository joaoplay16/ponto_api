import bcrypt from "bcrypt"
import AuthError from "../errors/AuthError"
import UserRepository from "../repository/UserRepository"
import { UsuarioSemSenha } from "../types/usuario"
import { isEmail } from "../util/email"

class AuthUseCase {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  authenticate = async (
    email: string,
    senha: string
  ): Promise<UsuarioSemSenha> => {
    if (![email, senha].every((campo) => campo && campo.length > 0)) {
      return Promise.reject(
        new AuthError(
          400,
          "Requisição inválida. Verifique os parâmetros fornecidos."
        )
      )
    }

    if (!isEmail(email)) {
      return Promise.reject(new AuthError(400, "E-mail inválido"))
    }

    if (senha.length < 8) {
      return Promise.reject(new AuthError(400, "Senha inválida"))
    }

    const usuario = await this.userRepository.findUserByEmail(email)

    if (!usuario) {
      return Promise.reject(
        new AuthError(403, "Este e-mail não está cadastrado.")
      )
    }

    if (!usuario.senha) {
      return Promise.reject(
        new AuthError(
          403,
          "Continue seu cadastro. Um e-mail foi enviado com as instruções para continuar seu cadastro."
        )
      )
    }

    if (usuario.ativo === 0) {
      return Promise.reject(
        new AuthError(
          403,
          "Sua conta está desativada/bloqueada. Entre em contato com o suporte para obter assistência."
        )
      )
    }

    const autenticado = bcrypt.compareSync(senha, usuario.senha)

    if (!autenticado) {
      return Promise.reject(
        new AuthError(
          403,
          "Credenciais de login inválidas. Por favor, verifique seu email e senha e tente novamente."
        )
      )
    }

    const { senha: _, ...usuarioSemASenha } = usuario

    return usuarioSemASenha as UsuarioSemSenha
  }
}

export default AuthUseCase