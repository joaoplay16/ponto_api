import { type Application } from "express"

var routes = require("./routes"),
  express = require("express"),
  morgan = require("morgan"),
  errorHandler = require("errorhandler")

module.exports = function (app: Application) {
  app.use(morgan("dev"))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  const router = routes.initialize(express.Router())

  app.use("/", router)

  if ("development" === app.get("env")) {
    app.use(errorHandler())
  }

  return app
}
