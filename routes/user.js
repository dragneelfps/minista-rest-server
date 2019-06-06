const express = require("express")
const router = express.Router()
const ProfileModel = require("./../data/models/profile")
const mongoose = require("mongoose")
const util = require("./util")

router.get("/", (req, res, next) => res.json(req.user))

router
  .route("/profile")
  .post((req, res, next) => {
    const missing = util.hasMissingErrors(req, ["firstName", "lastName", "dob"])
    if (missing) {
      return res.status(400, { missing })
    }
    ProfileModel.findOne({ userId: req.user._id })
      .then(profile => {
        if (profile) {
          return res.status(400).json({ message: "profile already exists" })
        }
        ProfileModel.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          dob: parseInt(req.body.dob),
          userId: mongoose.Types.ObjectId(req.user._id)
        })
          .then(profile => res.json(profile))
          .catch(next)
      })
      .catch(next)
  })
  .get((req, res, next) => {
    ProfileModel.findOne({ userId: req.user._id })
      .then(profile => {
        if (!profile) {
          return res.status(404).json({ message: "profile not found" })
        }
        return res.json(profile)
      })
      .catch(next)
  })

module.exports = router
