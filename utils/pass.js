'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;
const userModel = require('../models/userModel');

// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
  
      try {
        const user = await userModel.getUserLogin(username);
        console.log('Local strategy', user); // result is binary row
        if (user === undefined) {
          return done(null, false, {message: 'Incorrect email.'});
        }
        if (user.password !== password) {
          return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
      } catch (err) {
        return done(err);
      }
    }));

// TODO: JWT strategy for handling bearer token

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : 'secret_mania',
},
 async (jwtPayload, done) => {
  try {
    const user = await userModel.getUserLogin(jwtPayload.email);
    console.log('jwt strategy', jwtPayload);
    console.log('user from db', user)

    return done(null, {...user}); 
  } catch (err) {
    return done(err);
  }
}
));


module.exports = passport;