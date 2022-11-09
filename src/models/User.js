//import datatypes and model from sequelize
const { DataTypes, Model } = require("sequelize");
//import db instance to create table
const db = require("../db/db");
//create/extending the class of User
class User extends Model {}
//structure the User table using init
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "User",
  }
);

module.exports = User;
