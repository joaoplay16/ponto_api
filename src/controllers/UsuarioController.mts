const Usuario = require("../models/Usuario")
import { type Request, type Response } from "express"
import type Usuario from "../types/usuario"
import bcrypt from "bcrypt"
import { isEmail } from "../util/email"
import sendMail, { EmailFields } from "../service/emailService"
import { generateUserRegisterTemplate } from "../util/email"
import dotenv from "dotenv"
dotenv.config()

const UsuarioController = {
  async index(req: Request, res: Response): Promise<void> {
    try {
      const { limit, offset, cargo} = req.query

      const usuarios: Usuario[] = await Usuario.findAndCountAll({
        where: {...(cargo && {cargo})},
        limit: parseInt(limit as string) || 20,
        offset: parseInt(offset as string) || 0,
        order: [["nome", "ASC"]],
      })
      if (usuarios != null) {
        res.json(usuarios)
      } else {
        res.status(404).json({ error: "Nenhum usuário encontrado" })
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error)
      res.status(500).json({ error: "Erro interno do servidor" })
    }
  },

  async details(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      var result = await Usuario.findByPk(id)
      if (result != null) {
        const { senha, ...usuarioSemASenha }: Usuario = result.dataValues;

        res.json(usuarioSemASenha)
      } else {
        res.status(404).json({ error: "Usuário não encontrado" })
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error)
      res.status(404).json({ error: "Usuário não encontrado" })
    }
  },

  async save(req: Request, res: Response): Promise<void> {
    try {
      const usuario: Usuario = req.body

      const { nome, email, nome_de_usuario, celular } = usuario

      if (
        ![nome, email, nome_de_usuario, celular].every(
          (campo) => campo && campo.length > 0
        )
      ) {
        res.status(400).json({
          error: "Requisição inválida. Verifique os parâmetros fornecidos."
        })
        return
      }

      if(!isEmail(email)){
        res.status(400).json({
          error: "Informe um e-mail válido.",
        })
        return
      }

      const { senha, ...usuarioSemASenha }: Usuario = usuario
      
      const usuarioCriado = await Usuario.create(usuarioSemASenha)

      if (usuarioCriado != null) {
        res.json(usuarioCriado)
        sendMail({
          to: email,
          subject: "EmPonto - Continue seu cadastro",
          html: generateUserRegisterTemplate(
            nome,
            `${process.env.USER_REGISTRATION_URL}?usuario=${nome_de_usuario}`
          )
        } as EmailFields)
      } else {
        res
          .status(500)
          .json({ error: "Erro interno do servidor falha ao criar usuário" })
      }
    } catch (error: any) {
      console.error("Erro interno do servidor", error)
      if (error.original.code == "ER_DUP_ENTRY") {
        switch (error.errors[0].path) {
          case "nome_de_usuario":
            res.status(500).json({ error: "Este nome usuário já foi cadastrado" })
            break
          case "email":
            res.status(500).json({ error: "O endereço de e-mail já foi cadastrado" })
            break
        }
       return
      }

      res.status(500).json({ error: "Erro interno do servidor", info: error })
    }
  },

  // Define a senha do usuário pré-registrado
  async register(req: Request, res: Response): Promise<void> {
    try {

      const { usuario: usuarioParam, senha } = req.body
      
      const usuario: Usuario = await Usuario.findOne({
        where: {nome_de_usuario: usuarioParam}
      })

      if(usuario?.senha) {
        res.status(409).json({
          error: "Este usuário já foi cadastrado.",
        })
        return
      }

      var hashDaSenha = ""

      if(senha){
          if(senha.length >= 8){
            hashDaSenha = bcrypt.hashSync(senha, 10)
          }else{
            res.status(400).json({
              error: "A senha deve ter 8 ou mais caracteres.",
            })
            return
          }
      }

      const resultado = await Usuario.update(
        {senha: hashDaSenha},
        {
          where: { id: usuario.id },
        }
      )

      res.json(resultado)
      
    } catch (error: any) {
      console.error("Erro interno do servidor", error)
      
      res.status(500).json({ error: "Erro interno do servidor", info: error })
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id_usuario } = req.params
      const usuario: Usuario = req.body

      const { nome, email, cargo, nome_de_usuario, celular, senha } =
        usuario

      if (
        ![nome, email, cargo, nome_de_usuario, celular].every(
          (campo) => campo && campo.length > 0
        )
      ) {
        res.status(400).json({
          error: "Requisição inválida. Verifique os parâmetros fornecidos.",
        })
        return
      }

      var hashDaSenha = ""

      if (senha) {
        if (senha.length >= 8) {
          hashDaSenha = bcrypt.hashSync(senha, 10)
        } else {
          res.status(400).json({
            error: "A senha deve ter 8 ou mais caracteres.",
          })
          return
        }
      }
     
      const usuarioAtualizado = {
        ...usuario,
        ...(hashDaSenha && { senha: hashDaSenha }),
      }

      const resultado = await Usuario.update(
        usuarioAtualizado,
        {
          where: { id: id_usuario },
        }
      )

      if(resultado[0] < 0){
        res.status(500).json({error: "Falha ao atualizar usuário"})
        return
      }

      res.status(200).json(resultado)
    } catch (error: any) {
      console.error("Erro ao atualizar usuário:", error)
      if (error.original.code == "ER_DUP_ENTRY") {
        switch (error.errors[0].path) {
          case "nome_de_usuario":
            res
              .status(500)
              .json({ error: "Este nome usuário já foi cadastrado" })
            break
          case "email":
            res
              .status(500)
              .json({ error: "O endereço de e-mail já foi cadastrado" })
            break
        }
        return
      }
      res.status(404).json({ error: "Erro interno do servidor" })
    }
  },
}

export default UsuarioController
