const _ = require("lodash");
const { User, validate } = require("../models/user_model.js");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
router.use(express.json());

router.post("/", async (req, res) => {
  //input validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //check whether user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User was already registered");
  //create the new user object
  /* user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }); */
  //or create object with loadash pick method filter
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  //save the user to db
  await user.save();
  //send response to client
  /* res.send({
    name: user.name,
    email: user.email,
  }); */
  //or use lodash pick method
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
