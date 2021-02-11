const passport = require("../services/auth/passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user, trace) => {
    req.user = user;
    // console.log("user - " + JSON.stringify(user));
    next();
  })(req, res, next);
};