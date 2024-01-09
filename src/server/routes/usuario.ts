import { type Router, type Request, type Response } from "express"
import { UsuarioController } from "../../controllers/index.mjs"
import { PontoController } from "../../controllers/index.mjs"
import { isUserAuthorized } from "../authMiddleware"

module.exports = function (router: Router) {
  router.post("/usuario/registro", UsuarioController.register)
  // Envia email para redefinicao de senha
  router.get(
    "/usuario/redefinir_senha",
    UsuarioController.sendPasswordRecoveryEmail
  )
  // Salva nova senha
  router.post(
    "/usuario/nova_senha",
    UsuarioController.resetPassword
  )
  router.get("/usuario/:id", isUserAuthorized, UsuarioController.details)
  router.post("/usuario/criar", UsuarioController.save)
  router.post(
    "/usuario/:id_usuario/atualizar",
    isUserAuthorized,
    UsuarioController.update
  )

  router.get(
    "/usuario/:id_usuario/pontos",
    isUserAuthorized,
    PontoController.index
  )
  router.get(
    "/usuario/:id_usuario/relatorio",
    isUserAuthorized,
    PontoController.userReport
  )

  return router
}
