'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');

const login = (req, res) => {
  passport.authenticate('local', {session: false},
      (err, user, info) => {
        if (err || !user) {
          console.log('error', info);
          return res.status(400).json(info);
        }
        req.login(user, {session: false}, (err) => {
          if (err) res.send(err);
        });

        const token = jwt.sign(user, 'secret_mania');
        return res.json({token});
      }
  )(req, res);
};

module.exports = {
  login,
};
