import { type Application } from "express"

var routes = require("./routes"),
  express = require("express"),
  morgan = require("morgan"),
  errorHandler = require("errorhandler"),
  session = require("express-session"),
  cors = require("cors")

module.exports = function (app: Application) {
  const corsOptions = {
    // origin: "http://localhost:3000/",
    origin: true, 
    credentials: true,
  }

  app.use(cors(corsOptions))
  app.use(morgan("dev"))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  const router = routes.initialize(express.Router())

  app.use(
    session({
      secret: "0gMDvqoFf1RWdrUH",
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000, // Tempo de vida do cookie em milissegundos (opcional, ajuste conforme necessário)
        secure: false, // Se verdadeiro, o cookie só será enviado em conexões HTTPS
        httpOnly: true, // Impede que o cookie seja acessado pelo JavaScript do lado do cliente
      },
    })
  )

  app.use("/", router)

  if ("development" === app.get("env")) {
    app.use(errorHandler())
  }

  return app
}
