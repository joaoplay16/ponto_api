import { type Router, type Request, type Response } from "express"
import { UsuarioController } from "../../controllers/index.mjs"
import { PontoController } from "../../controllers/index.mjs"
import { isAdminAuthorized } from "../authMiddleware"

module.exports = function (router: Router) {
  router.get("/admin/usuarios", isAdminAuthorized, UsuarioController.index)
  router.get(
    "/admin/ponto/relatorio",
    isAdminAuthorized,
    PontoController.usersReport
  )

  return router
}
