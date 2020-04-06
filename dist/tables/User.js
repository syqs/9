"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var crypto = _interopRequireWildcard(require("crypto"));

var Sequelize = _interopRequireWildcard(require("sequelize"));

var _jsonwebtoken = require("jsonwebtoken");

var _config = require("../config");

var _dbConnection = require("../dbConnection");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// if (!(sequelize instanceof Sequelize)) throw new Error("DB connection error");
var User = _dbConnection.sequelize.define("user", {
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
  }
});

User.prototype.validPassword = function (password) {
  // no arrow functions when using this.
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
  return this.hash === hash;
};

User.prototype.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
};

User.prototype.generateJWT = function () {
  // set token to expire in 1hr exp.setTime(today.getTime() + 3.6e+6);
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  return (0, _jsonwebtoken.sign)({
    id: this._id,
    email: this.email,
    exp: parseInt((exp.getTime() / 1000).toString())
  }, _config.secret);
};

User.prototype.generateRJWT = function () {
  var today = new Date();
  var exp = new Date(today);
  exp.setTime(today.getTime() + 2.88e+7); // change to expire token expires in 8hr

  return (0, _jsonwebtoken.sign)({
    id: this._id,
    email: this.email,
    exp: parseInt((exp.getTime() / 1000).toString())
  }, _config.secret);
};

User.prototype.toAuthJSON = function () {
  return {
    email: this.email,
    token: this.generateJWT(),
    refresh: this.generateRJWT(),
    firstName: this.firstName,
    lastName: this.lastName
  };
};

User.prototype.toProfileJSONFor = function (user) {
  return {
    username: this.username,
    email: this.email
  };
};

_dbConnection.sequelize.sync();

var _default = User;
exports.default = _default;