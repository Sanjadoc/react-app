const passport = require("passport-strategy");
const util = require("util");
const axios = require("axios").default;

const GOOGLE_AUTH_ENDPOINT = "https://www.googleapis.com/oauth2/v3/userinfo";

function Strategy(options, verify) {
  if (typeof options == "function") {
    verify = options;
    options = {};
  }
  if (!verify) {
    throw new TypeError("Google strategy requires a verify callback");
  }

  passport.Strategy.call(this);

  this.name = "google";
  this._verify = verify;
  this._options = options;
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Authenticate request based on accessToken
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function (req, options) {
  options = options || {};
  const authHeader = req.headers.authorization;
  const accessToken = authHeader ? authHeader.replace("Bearer ", "") : null;

  if (!accessToken) {
    return this.fail(
      { message: options.badRequestMessage || "Missing access token" },
      400,
    );
  }

  var self = this;

  function verified(err, user, info) {
    if (err) {
      return self.error(err);
    }
    if (!user) {
      return self.fail(info);
    }
    self.success(user, info);
  }

  try {
    axios
      .get(GOOGLE_AUTH_ENDPOINT, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "json",
      })
      .then((response) => {
        self._verify(response.data, verified);
      }, self.error);
  } catch (ex) {
    return self.error(ex);
  }
};

module.exports = Strategy;