const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("./strategies/google");
const FacebookStrategy = require("./strategies/facebook");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const User = require("../../models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findByEmail(email);
        if (!user) {
          return done(null, false, { message: "User is not registered" });
        }

        if (!user.active) {
          return done(null, false, { message: "User email is not verified" });
        }

        const pwdMatch = await bcrypt.compare(password, user.password);

        if (!pwdMatch) {
          return done(null, false, { message: "Password doesn't match" });
        }

        return done(null, user, { message: "User is logged" });
      } catch (e) {
        console.log(e.stack);
        return done(e);
      }
    },
  ),
);

passport.use(
  new JwtStrategy(
    {
      // jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      audience: process.env.HOST,
    },
    async (payload, done) => {
      try {
        const user = await User.findByEmail(payload.email);
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        console.log(error.stack);
      }
    },
  ),
);

passport.use(
  new GoogleStrategy(async (profile, done) => {
    try {
      const user = await User.findByEmail(profile.email);
      if (user) {
        done(null, profile);
      } else {
        done(null, profile);
      }
    } catch (error) {
      done("Google auth failed", null);
      console.log(error.stack);
    }
    // return profile ? done(null, profile) : done("Google auth failed", null);
  }),
);

passport.use(
  new FacebookStrategy(async (profile, done) => {
      try {
        const user = await User.findByEmail(profile.email);
        if (user) {
          done(null, profile);
        } else {
          done(null, profile);
        }
      } catch (error) {
        done("Facebook auth failed", null);
        console.log(error.stack);
      }
    }
  )
);

module.exports = passport;
