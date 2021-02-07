const passport = require("../services/auth/passport");

module.exports = function (req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, trace) => {
    req.user = user;
    next();
  })(req, res, next);
};
