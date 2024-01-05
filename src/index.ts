import { type Application } from "express"
var express = require("express"),
  config = require("./server/configure"),
  app: Application = express()

app = config(app)

app.set("port", process.env.PORT || 8088)

app.listen(app.get("port"), function () {
  console.log("Server up: http://localhost:" + app.get("port"))
})
