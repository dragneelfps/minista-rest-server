const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validator.isEmail, "invalid email"]
  },
  password: { type: String, required: true, bcrypt: true, select: false }
})

userSchema.plugin(require("mongoose-bcrypt"))

module.exports = mongoose.model("User", userSchema)
