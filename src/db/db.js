//import Sequelize connection constructor
const { Sequelize } = require("sequelize");
//import path module from Node
const path = require("path");

//set up database connection
const db = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "user.sqlite"),
});

//exporting db for use throughout
module.exports = db;
