"use strict";

var _User = _interopRequireDefault(require("../../tables/User"));

var _AccountType = _interopRequireDefault(require("../../tables/AccountType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = require('express').Router();

var passport = require('passport');

var auth = require('../auth');

var nodemailer = require('nodemailer');

var secrets = require('../../../secrets.json');

router.get("/user", auth.required, function (req, res, next) {
  _User.default.findById(req.payload.id).then(function (user) {
    if (!user) {
      return res.sendStatus(401);
    }

    return res.json({
      user: user.toAuthJSON()
    });
  }).catch(next);
});
router.put("/user", auth.required, function (req, res, next) {
  _User.default.findOne(req.payload.id).then(function (user) {
    if (!user) {
      return res.sendStatus(401);
    } // only update fields that were actually passed...


    if (typeof req.body.user.username !== "undefined") {
      user.username = req.body.user.username;
    }

    if (typeof req.body.user.email !== "undefined") {
      user.email = req.body.user.email;
    }

    if (typeof req.body.user.organization !== "undefined") {
      user.organization = req.body.user.organization;
    }

    if (typeof req.body.user.accountType !== "undefined") {
      user.accountType = req.body.user.accountType;
    }

    if (typeof req.body.user.phone !== "undefined") {
      user.accountType = req.body.user.phone;
    }

    if (typeof req.body.user.password !== "undefined") {
      user.setPassword(req.body.user.password);
    }

    return user.save().then(function () {
      return res.json({
        user: user.toAuthJSON()
      });
    });
  }).catch(next);
}); // Login post

router.post("/users/login", function (req, res, next) {
  if (!req.body.user.email) {
    return res.status(422).json({
      errors: {
        email: "can't be blank"
      }
    });
  }

  if (!req.body.user.password) {
    return res.status(422).json({
      errors: {
        password: "can't be blank"
      }
    });
  }

  passport.authenticate("local", {
    session: false
  }, function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (user) {
      user.token = user.generateJWT();
      user.refresh = user.generateRJWT();
      return res.json({
        user: user.toAuthJSON()
      });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});
router.get('/reset', function (req, res, next) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ortysome@gmail.com',
      pass: secrets.emailPassowrd
    }
  });
  var mailOptions = {
    from: 'test@gmail.com',
    to: 'test@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'Reset email placeholder'
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.send('Reset email sent');
});
router.post('/users',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = new _User.default();
            _context.prev = 1;
            _context.next = 4;
            return new Promise(function (resolve, reject) {
              _User.default.findOne({
                where: {
                  email: req.body.user.email
                }
              }).then(function (user) {
                if (user) {
                  reject('Email has already been registered.');
                } else {
                  resolve();
                }
              }).catch(function (err) {
                reject(err);
              });
            });

          case 4:
            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](1);
            next(_context.t0);
            return _context.abrupt("return");

          case 10:
            user.firstName = req.body.user.firstName;
            user.lastName = req.body.user.lastName;
            user.email = req.body.user.email;
            user.setPassword(req.body.user.password);
            user.save().then().catch(next);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 6]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
module.exports = router;