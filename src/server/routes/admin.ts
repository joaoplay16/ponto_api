import { type Router, type Request, type Response } from "express"
import { UsuarioController } from "../../controllers/index.mjs"
import { PontoController } from "../../controllers/index.mjs"

module.exports = function (router: Router) {
  router.get("/admin/usuarios", UsuarioController.index)
  router.get("/admin/ponto/relatorio", PontoController.usersReport)

  return router
}
