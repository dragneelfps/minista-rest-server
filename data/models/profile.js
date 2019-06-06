const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

module.exports = mongoose.model("Profile", profileSchema)
