const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const bcrypt = require('bcrypt');
const User = require('../../models/user');

passport.use(
  new LocalStrategy({ 
      usernameField: 'email',
      passwordField: 'password'
    },
    async function (username, password, done) {
      const user = await User.findByName(username);
      if (user) {
        const pwdMatch = await bcrypt.compare(password, user.password);

        if (pwdMatch) {
          return done(null, user);
        }
      }

      return done(null, false, { message: 'Invalid user credentials' });
    },
  ),
);

passport.use( new BearerStrategy (
  async function(token, done) {
    const user = await User.findByToken(token);
    console.log('CURRENT USER:', user);
    return done(null, user);
  }
));

module.exports = passport;
