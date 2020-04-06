const isProduction = process.env.NODE_ENV === "production";
let Sequelize = require("sequelize");
let sequelize = new Sequelize("nu", "root", "root", {
    host: "localhost",
    dialect: "sqlite",
    storage: "database.sqlite"
  });

module.exports = { sequelize }; 
