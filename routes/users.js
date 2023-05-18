const _ = require("lodash");
const bcrypt = require("bcrypt");
const myPlaintextPassword = "s0//P4$$w0rD";
const saltRounds = 10;
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// router.post("/", async (req, res) => {
//   const users = await User.find().sort("name");
//   res.send(users);
// });

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  //   user = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password,
  //   });
  //or we can use lodash for the req.body

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  //   await bcrypt.genSalt(saltRounds, function (err, salt) {
  //     bcrypt.hash(myPlaintextPassword, user.password, salt, function (err, hash) {
  //       user.password;
  //     });
  //   });

  const salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();

  //here we have tp use the lodash so it doesn't show the password

  //   res.send(user);
  res.send(_.pick(user, ["id", "name", "email"]));
});

module.exports = router;
