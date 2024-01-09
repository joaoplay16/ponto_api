import { type Router, type Request, type Response } from "express"
import { UsuarioController } from "../../controllers/index.mjs"
import { PontoController } from "../../controllers/index.mjs"
import {isUserAuthorized} from "../authMiddleware"

module.exports = function (router: Router) {
  router.post("/usuario/registro", UsuarioController.register)
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
