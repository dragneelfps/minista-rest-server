const express = require("express")
const jwt = require("jsonwebtoken")
const config = require("../config")
const passport = require("passport")
const router = express.Router()
const UserModel = require("../data/models/user")
const util = require("./util")

router.post("/signup", (req, res, next) => {
  const missing = util.hasMissingErrors(req, ["username", "email", "password"])
  if (missing) {
    //missing values
    return res.json(400, { missing })
  }
  const { username, email, password } = req.body
  UserModel.create({ username, email, password })
    .then(user => {
      const token = jwt.sign(user.toJSON(), config.jwt.secret)
      res.json({ user, token })
    })
    .catch(next)
})

router.post("/signin", (req, res, next) => {
  const error = util.hasMissingErrors(req, ["email", "password"])
  if (error) {
    return next(new errs.MissingParameterError(error))
  }
  const { email, password } = req.body
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        err,
        user: user
      })
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err)
      }
      const token = jwt.sign(user.toJSON(), config.jwt.secret)
      return res.json({ user, token })
    })
  })(req, res)
})

module.exports = router
