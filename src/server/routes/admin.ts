import { type Router, type Request, type Response } from "express"
import { UsuarioController } from "../../controllers/index.js"
import { PontoController } from "../../controllers/index.js"
import { isAdminAuthorized } from "../authMiddleware"

function adminRouter(router: Router) {
  router.get("/admin/usuarios", isAdminAuthorized, UsuarioController.index)
  router.get(
    "/admin/ponto/relatorio",
    isAdminAuthorized,
    PontoController.usersReport
  )

  return router
}

export default adminRouter
