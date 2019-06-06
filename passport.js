const passport = require("passport")
const passportJWT = require("passport-jwt")
const LocalStratedgy = require("passport-local").Strategy
const JWTStratedgy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const jwt = require("jsonwebtoken")
const config = require("./config")
const UserModel = require("./data/models/user")

passport.use(
  new LocalStratedgy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, cb) => {
      UserModel.findOne({ email }, "+password") //need to include the password for bcrypt to work
        .then(user => {
          if (!user) {
            return cb(null, false, { message: "Incorrect email" })
          }
          //user found with given email
          //check for password
          user
            .verifyPassword(password)
            .then(valid => {
              if (valid) {
                // const tokenResponse = generateJwtToken(user)
                // res.send(tokenResponse)
                // return next()
                user.password = undefined
                return cb(null, user, { message: "Logged in Succesfully" })
              }
              //passwords do not match
              return cb(null, false, { message: "Incorrect password" })
              // return next(new errs.InvalidCredentialsError("incorrect password"))
            })
            .catch(cb)
        })
        .catch(cb)
    }
  )
)

passport.use(
  new JWTStratedgy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.secret
    },
    (payload, cb) => {
      return cb(null, payload)
    }
  )
)
