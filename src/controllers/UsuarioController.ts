import bcrypt from "bcrypt"
import "dotenv/config"
import { type Request, type Response } from "express"
import jwt, { JwtPayload, Secret, VerifyErrors } from "jsonwebtoken"
import UsuarioModel from "../models/Usuario"
import UsuarioType from "../types/usuario"
import sendMail, { EmailFields } from "../service/emailService"
import { generatePasswordRedefinitionTemplate, generateUserRegisterTemplate, isEmail } from "../util/email"

const UsuarioController = {
  async index(req: Request, res: Response): Promise<void> {
    try {
      const { limit, offset, cargo} = req.query

      const usuarios = await UsuarioModel.findAndCountAll({
        where: {cargo: cargo as string},
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

      var result = await UsuarioModel.findByPk(id)
      if (result != null) {
        const { senha, ...usuarioSemASenha }: UsuarioModel = result.dataValues;

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
      const usuarioInfo: UsuarioModel = req.body

      const { nome, email, nome_de_usuario, celular } = usuarioInfo

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

      const novoUsuario: UsuarioType = usuarioInfo
      
      const usuarioCriado = await UsuarioModel.create(novoUsuario)

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
            res.status(409).json({ error: "Este nome usuário já foi cadastrado" })
            break
          case "email":
            res.status(409).json({ error: "O endereço de e-mail já foi cadastrado" })
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
      
      const usuario = await UsuarioModel.findOne({
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

      const resultado = await UsuarioModel.update(
        {senha: hashDaSenha},
        {
          where: { id: usuario?.id },
        }
      )

      res.json(resultado)
      
    } catch (error: any) {
      console.error("Erro interno do servidor", error)
      
      res.status(500).json({ error: "Erro interno do servidor", info: error })
    }
  },

  async sendPasswordRecoveryEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.query

      if (!isEmail(email as string)) {
        res.status(400).json({
          error: "Informe um e-mail válido.",
        })
        return
      }

      const usuario = await UsuarioModel.findOne({
        where: { email: email as string },
      })

      if (usuario == null) {
        res.status(404).json({
          error: "Este email não está cadastrado",
        })
        return
      }

      const jwtSecretKey = process.env.JWT_SECRET_KEY || ""
      const token = jwt.sign({ email }, jwtSecretKey, { expiresIn: "20m" })

      sendMail({
        to: email,
        subject: "EmPonto - Redefinição de senha",
        html: generatePasswordRedefinitionTemplate(
          usuario.nome,
          `${process.env.PASSWORD_CHANGE_URL}?token=${token}`
        ),
      } as EmailFields)
        .then(() => {
          res.status(200).send()
        })
        .catch((e: any) => {
          res
            .status(500)
            .json({ error: "Erro ao enviar e-mail para redefinição de senha" })
        })
    } catch (error: any) {
      console.error("Erro interno do servidor", error)

      res.status(500).json({ error: "Erro interno do servidor", info: error })
    }
  },
  
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token, senha } = req.body

      const jwtSecretKey: Secret = process.env.JWT_SECRET_KEY || ""

      jwt.verify(
        token as string,
        jwtSecretKey,
        async (
          err: VerifyErrors | null,
          decoded: JwtPayload | string | undefined
        ) => {
          if (err) {
            console.log("Erro de decodificação de token", err)
            return res
              .status(400)
              .json({ error: "Token inválido ou expirado." })
          }

          if (decoded) {
            const { email } = decoded as { email: string }

            const count: number = await UsuarioModel.count({
              where: { email },
            })

            // Verifica se usuario existe
            if (count == 0) {
              res.status(404).json({
                error: "Este email não está cadastrado",
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

            //Se correu tudo bem recebemos [1]
            const linhasAfetadas: [number] = await UsuarioModel.update(
              { senha: hashDaSenha },
              {
                where: { email },
              }
            )

            return res.json(linhasAfetadas)
          }
        }
      )
    } catch (error: any) {
      console.error("Erro interno do servidor", error)

      res.status(500).json({ error: "Erro interno do servidor", info: error })
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id_usuario } = req.params
      const usuario: UsuarioModel = req.body

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

      const resultado = await UsuarioModel.update(
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
