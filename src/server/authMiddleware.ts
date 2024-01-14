import { NextFunction, Request, Response } from "express"
import { UsuarioSemSenha } from "../types/usuario"
import dotenv from "dotenv"
dotenv.config()

const erroDeAutenticacao =
  "Este recurso está disponível apenas para usuários autenticados. Faça login para acessar."

const erroDePermissão =
  "Este recurso está disponível apenas para usuários com permissões elevadas."

const isUserAuthorized = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV == "development") {
    return next()
  }

  if (req.session.usuario) {
    return next()
  }

  return res.status(403).json({ error: erroDeAutenticacao })
}

const isAdminAuthorized = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.NODE_ENV == "development") {
    return next()
  }

  const usuarioDeSessao: UsuarioSemSenha | undefined = req.session.usuario

  if (!usuarioDeSessao) {
    return res.status(403).json({ error: erroDeAutenticacao })
  }

  if (usuarioDeSessao.e_admin == 0) {
    return res.status(403).json({ error: erroDePermissão })
  }

  return next()
}

export { isUserAuthorized, isAdminAuthorized }
