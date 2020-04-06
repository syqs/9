import * as crypto from "crypto";
import * as Sequelize from "sequelize";
import { sign } from "jsonwebtoken";
import { secret } from "../config";
import { sequelize } from "../dbConnection";

// if (!(sequelize instanceof Sequelize)) throw new Error("DB connection error");
let User = sequelize.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  hash: {
    type: Sequelize.TEXT
  },
  salt: {
    type: Sequelize.TEXT
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
});

User.prototype.validPassword = function(password) { // no arrow functions when using this.
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

User.prototype.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

User.prototype.generateJWT = function() { // set token to expire in 1hr exp.setTime(today.getTime() + 3.6e+6);
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return sign(
    {
      id: this._id,
      email: this.email,
      exp: parseInt((exp.getTime() / 1000).toString())
    },
    secret
  );
};

User.prototype.generateRJWT = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setTime(today.getTime() + 2.88e+7); // change to expire token expires in 8hr

  return sign(
    {
      id: this._id,
      email: this.email,
      exp: parseInt((exp.getTime() / 1000).toString())
    },
    secret
  );
};

User.prototype.toAuthJSON = function() {
  return {
    email: this.email,
    token: this.generateJWT(),
    refresh: this.generateRJWT(),
    firstName: this.firstName,
    lastName: this.lastName
  };
};

User.prototype.toProfileJSONFor = function(user) {
  return {
    username: this.username,
    email: this.email
  };
};

sequelize.sync();

export default User;
