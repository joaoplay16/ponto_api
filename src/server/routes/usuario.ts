import { type Router, type Request, type Response } from "express"

module.exports = function (router: Router) {
  router.get("/", function (req: Request, res: Response) {
    res.send("Collaborator")
  })

  return router
}
