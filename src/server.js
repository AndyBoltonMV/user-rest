//import express
const express = require("express");
//assing web server app constant
const app = express();
//import userRouter for use in our web server
const userRouter = require("./routes/user");
//import db for sync purposes
const db = require("./db/db");

//allow web server to parse JSON
app.use(express.json());
app.use("/user", userRouter);
app.get("/sync", async (req, res) => {
  await db.sync({ force: true });
  res.sendStatus(200);
});

//listen on port
// app.listen(5001, () => {
//   console.log("Listening on port 5001");
// });

module.exports = app;
