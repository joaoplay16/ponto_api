import { type Router } from "express"

import admin from "./admin"
import collaborator from "./usuario"
import auth from "./auth"

function initialize(router: Router) {
  admin(router)
  collaborator(router)
  auth(router)

  return router
}

export default { initialize }
