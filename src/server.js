//import express
const express = require("express");
//assing web server app constant
const app = express();
//import userRouter for use in our web server
const userRouter = require("./routes/user");
//import db for sync purposes
const db = require("./db/db");

const { body, validationResult } = require("express-validator");

function middle(req, res, next) {
  try {
    if (req.body.name) {
      req.body.name = req.body.name.toUpperCase();
    }
    next();
  } catch (error) {
    // next(error) //pass the error along the chain of functions/controllers on the endpoint
    res.status(404).send(error); //Stop progress on the endpoint and send an error from this location
  }
}

function passLength(req, res, next) {
  try {
    if (req.body.password && req.body.password.length < 8) {
      throw new Error("Password not long enough");
    }
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
}

//allow web server to parse JSON
app.use(express.json());
// app.use(middle);
app.use("/user", passLength, userRouter);
app.use(
  "/user2",
  body("password").custom((value) => {
    if (value.length < 8) {
      return Promise.reject("Password not long enough");
    }
  }),
  userRouter
);
app.get("/sync", async (req, res) => {
  await db.sync({ force: true });
  res.sendStatus(200);
});

//listen on port
app.listen(5001, () => {
  console.log("Listening on port 5001");
});

module.exports = app;
