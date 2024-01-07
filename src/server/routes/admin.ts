import { type Router, type Request, type Response } from "express"
import { UsuarioController } from "../../controllers/index.mjs"

module.exports = function (router: Router) {
  router.get("/admin/", function (req: Request, res: Response) {
    res.send("Admin")
  })

  router.get("/admin/usuarios", UsuarioController.index)

  return router
}
