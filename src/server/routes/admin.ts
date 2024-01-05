import { type Router, type Request, type Response } from "express"

module.exports = function (router: Router) {
  router.get("/admin/", function (req: Request, res: Response) {
    res.send("Admin")
  })

  return router
}
