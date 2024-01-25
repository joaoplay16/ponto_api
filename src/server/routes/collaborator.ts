import { type Router, type Request, type Response } from "express"

function collaboratorRouter(router: Router) {
  router.get("/", function (req: Request, res: Response) {
    res.send("Collaborator")
  })

  return router
}

export default collaboratorRouter
