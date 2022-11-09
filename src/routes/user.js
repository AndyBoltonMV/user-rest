//object destructered import
const { Router } = require("express");
//immediatly invoke an imported function
// const userRouter = require("express").Router()
//create router using Router return value
const userRouter = Router();
//import User model for manipulation
const User = require("../models/User");

//add GET route to router
userRouter.get("/health", (req, res) => {
  res.sendStatus(200);
});

userRouter.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send({ user });
  } catch (error) {
    res.status(500).send(error);
  }
});

//export router for use in other files
module.exports = userRouter;
