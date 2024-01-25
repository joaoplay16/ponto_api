import { type Application } from "express"
import configuration from "./server/configure"
import express from "express"
import dotenv from "dotenv"
import "./database"
dotenv.config()
var app: Application = express()

app = configuration(app)

app.set("port", process.env.PORT || 8088)

app.listen(app.get("port"), function () {
  console.log("Server up: http://localhost:" + app.get("port"))
})
