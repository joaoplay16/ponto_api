import { type Application } from "express"

var routes = require("./routes"),
  express = require("express"),
  morgan = require("morgan"),
  errorHandler = require("errorhandler"),
  session = require("express-session"),
  cors = require("cors")

module.exports = function (app: Application) {
  app.use(cors())
  app.use(morgan("dev"))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  const router = routes.initialize(express.Router())

  app.use(
    session({
      secret: "0gMDvqoFf1RWdrUH",
      resave: true,
      saveUninitialized: false,
    })
  )

  app.use("/", router)

  if ("development" === app.get("env")) {
    app.use(errorHandler())
  }

  return app
}
