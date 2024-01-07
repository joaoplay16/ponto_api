import { type Router, type Request, type Response } from "express"
import { UsuarioController } from "../../controllers/index.mjs"
import { PontoController } from "../../controllers/index.mjs"

module.exports = function (router: Router) {
  router.get("/usuario/:id", UsuarioController.details)
  router.post("/usuario/criar", UsuarioController.save)
  router.post("/usuario/:id_usuario/atualizar", UsuarioController.update)

  router.get("/usuario/:id_usuario/pontos", PontoController.index)
  router.get("/usuario/:id_usuario/relatorio", PontoController.userReport)

  return router
}
