const router = require('express').Router();
const passport = require('passport');
const auth = require('../auth');
const nodemailer = require('nodemailer');
const secrets = require('../../../secrets.json');

import User from "../../tables/User";
import AccountType from "../../tables/AccountType";

router.get("/user", auth.required, function(req, res, next) {
  User.findById(req.payload.id)
    .then(function(user) {
      if (!user) {
        return res.sendStatus(401);
      }

      return res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
});

router.put("/user", auth.required, function(req, res, next) {
  User.findOne(req.payload.id)
    .then(function(user) {
      if (!user) {
        return res.sendStatus(401);
      }

      // only update fields that were actually passed...
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

      return user.save().then(function() {
        return res.json({ user: user.toAuthJSON() });
      });
    })
    .catch(next);
});
// Login post
router.post("/users/login", function(req, res, next) {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate("local", { session: false }, function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (user) {
      user.token = user.generateJWT();
      user.refresh = user.generateRJWT()
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.get('/reset', function(req, res, next) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ortysome@gmail.com',
      pass: secrets.emailPassowrd
    }
  });

  const mailOptions = {
    from: 'test@gmail.com',
    to: 'test@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'Reset email placeholder'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.error(error)
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.send('Reset email sent')
})

router.post('/users', async function(req, res, next) {
  const user = new User();

  try {
    await new Promise(function(resolve, reject) {
      User.findOne({where: {email: req.body.user.email}}).then(function(user) {
        if (user) {
          reject('Email has already been registered.');
        }
        else {
          resolve()
        }
      }).catch(function(err) {
        reject(err);
      })
    });
  } catch (err) {
    next(err);
    return;
  }

  user.firstName = req.body.user.firstName;
  user.lastName = req.body.user.lastName;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  user
    .save()
    .then()
    .catch(next);
});

module.exports = router;
