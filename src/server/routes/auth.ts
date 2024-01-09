import { type Router, type Request, type Response } from "express"
import AuthController from "../../controllers/AuthController.mjs"

module.exports = function (router: Router) {
  router.post("/login", AuthController.login)
  router.get("/logout", AuthController.logout)

  return router
}
