import { type Router } from "express"

const admin = require("./admin")
const collaborator = require("./collaborator")

module.exports.initialize = function (router: Router) {
  admin(router)
  collaborator(router)

  return router
}
