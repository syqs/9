"use strict";

var _config = require("../config");

var jwt = require("express-jwt");

function getTokenFromHeader(req) {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Token" || req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    return req.headers.authorization.split(" ")[1];
  }

  return null;
}

var auth = {
  required: jwt({
    secret: _config.secret,
    userProperty: "payload",
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: _config.secret,
    userProperty: "payload",
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};
module.exports = auth;