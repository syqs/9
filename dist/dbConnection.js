"use strict";

var isProduction = process.env.NODE_ENV === "production";

var Sequelize = require("sequelize");

var sequelize = new Sequelize("nu", "root", "root", {
  host: "localhost",
  dialect: "sqlite",
  storage: "database.sqlite"
});
module.exports = {
  sequelize: sequelize
};