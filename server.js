// const restify = require("restify")
// const errs = require("restify-errors")
const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")

const config = require("./config")

require("./passport")
// const router = require("./routes/routes")

mongoose.connect(config.mongo.url, {
  useCreateIndex: true,
  useNewUrlParser: true
})

// const server = restify.createServer()
const app = express()

app.use(express.json())

app.use("/api/v1/auth", require("./routes/auth"))

app.use(
  "/api/v1/user",
  passport.authenticate("jwt", { session: false }),
  require("./routes/user")
)

// server.use(restify.plugins.acceptParser(server.acceptable))
// server.use(restify.plugins.bodyParser())

// //The plugin checks whether the user agent is curl.
// //If it is, it sets the Connection header to “close” and removes the “Content-Length” header.
// server.pre(restify.plugins.pre.userAgentConnection())

// router.applyRoutes(server)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send("Something broke")
})

app.listen(config.port, () => {
  console.log(`Server listening at ${config.port}`)
})
