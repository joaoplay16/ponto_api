import { NextFunction, Request, Response } from "express"
import { UsuarioSemSenha } from "../types/usuario"
import dotenv from "dotenv"
dotenv.config()

const erroDeAutenticacao =
  "Este recurso está disponível apenas para usuários autenticados. Faça login para acessar."

const isUserAuthorized = function (
  req: Request,
  res: Response,
  next: NextFunction
) {

  if(process.env.NODE_ENV == "development"){
    return next()
  }

  if (req.session.usuario) {
    return next()
  }

  var err = new Error(erroDeAutenticacao)
  return next(err)
}

const isAdminAuthorized = function (
  req: Request,
  res: Response,
  next: NextFunction
) {

  if(process.env.NODE_ENV == "development"){
    return next()
  }

  const usuarioDeSessao: UsuarioSemSenha | undefined = req.session.usuario

  if (usuarioDeSessao && usuarioDeSessao.e_admin == 1) {
    return next()
  }

  var err = new Error(erroDeAutenticacao)
  return next(err)
}

export { isUserAuthorized, isAdminAuthorized }
