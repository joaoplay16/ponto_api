import UsuarioModel from "../models/Usuario"
import { type Request, type Response } from "express"
import { isEmail } from "../util/email"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { UsuarioSemSenha } from "../types/usuario"
dotenv.config()

const AuthController = {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, senha } = req.body

      if (![email, senha].every((campo) => campo && campo.length > 0)) {
        res.status(400).json({
          error: "Requisição inválida. Verifique os parâmetros fornecidos.",
        })
        return
      }

      if (!isEmail(email)) {
        res.status(400).json({ error: "E-mail inválido" })
        return
      }

      if (senha.length < 8) {
        res.status(400).json({
          error: "Senha inválida",
        })
        return
      }

      const usuario = await UsuarioModel.findOne({
        where: { email: email },
        raw: true,
      })

      if (!usuario) {
        res.status(403).json({ error: "Este e-mail não está cadastrado." })
        return
      }

      if (!usuario.senha) {
        res.status(403).json({ error: "Continue seu cadastro. Um e-mail foi enviado com as instruções para continuar seu cadastro." })
        return
      }

      if (usuario.ativo === 0) {
        res.status(403).json({
          error:
            "Sua conta está desativada/bloqueada. Entre em contato com o suporte para obter assistência.",
        })
        return
      }

      const autenticado = bcrypt.compareSync(senha, usuario.senha)

      if (!autenticado) {
        res.status(403).json({
          error:
            "Credenciais de login inválidas. Por favor, verifique seu email e senha e tente novamente.",
        })
        return
      }

      const { senha: _, ...usuarioSemASenha }: UsuarioModel = usuario

      req.session.usuario = usuarioSemASenha as UsuarioSemSenha
      res.json(usuarioSemASenha)
    } catch (error) {
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
