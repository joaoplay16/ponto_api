import { type Router } from "express"

const admin = require("./admin")
const collaborator = require("./usuario")
const auth = require("./auth")

module.exports.initialize = function (router: Router) {
  admin(router)
  collaborator(router)
  auth(router)

  return router
}
