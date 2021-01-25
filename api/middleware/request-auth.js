const passport = require('../services/auth/passport');

module.exports = function (req, res, next) {
  passport.authenticate('bearer', { session: false }, (err, user, trace) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
};
