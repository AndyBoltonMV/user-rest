//object destructered import
const { Router } = require("express");
//immediatly invoke an imported function
// const userRouter = require("express").Router()
//create router using Router return value
const userRouter = Router();
//import User model for manipulation
const User = require("../models/User");

// function middle(req, res, next) {
//   try {
//     if (req.body.name) {
//       req.body.name = req.body.name.toUpperCase();
//     }
//     next();
//   } catch (error) {
//     // next(error) //pass the error along the chain of functions/controllers on the endpoint
//     res.status(404).send(error); //Stop progress on the endpoint and send an error from this location
//   }
// }

//add GET route to router
userRouter.get("/health", (req, res) => {
  res.sendStatus(200);
});

userRouter.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const obj = { user: user };
    res.status(201).send(obj);
  } catch (error) {
    res.status(500).send(error);
  }
});

//export router for use in other files
module.exports = userRouter;
