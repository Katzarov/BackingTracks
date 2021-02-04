const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");
const {isSamePassword} = require("../utils/passwordUtils");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = (username, password, done) => {
  User.findOne({ where: { email: username } })
    .then((user) => {
      if (!user) {
          console.log('1')
        return done(null, false);
      }

      const isValid = isSamePassword(password, user.phash, user.salt);

      console.log(isValid)

      if (isValid) {
        console.log('2')

        return done(null, user);
      } else {
        console.log('3')

        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findOne({ where: { id: userId } })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
