"use strict";

var _User = _interopRequireDefault(require("../tables/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passport = require("passport");

var LocalStrategy = require("passport-local").Strategy; // const User = require("../tables/User");


passport.use(new LocalStrategy({
  usernameField: "user[email]",
  passwordField: "user[password]"
}, function (email, password, done) {
  _User.default.findOne({
    where: {
      email: email
    }
  }).then(function (user) {
    if (!user || !user.validPassword(password)) {
      return done(null, false, {
        errors: {
          "email or password": "is invalid"
        }
      });
    }

    return done(null, user);
  }).catch(done);
}));