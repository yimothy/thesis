const userModel = require('../user/userModel');
const userController = require('../user/userController');
const PassportLocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    fullname: req.body.fullname.trim()
  };
  userController.users.createPassword(userData.password, (hashPassword) => {
    const params = [userData.email, hashPassword, userData.fullname];
    userModel.users.addOne(params, (response) => {
      if (!response) {
        console.log('Issue in adding to database');
        return done('Error adding user to db');
      }
      console.log('Signup Successful!');
      return done(null);
    });
  });
});
