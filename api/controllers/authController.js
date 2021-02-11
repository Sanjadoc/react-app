const User = require("../models/user");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const passport = require("../services/auth/passport");
const jwt = require("jsonwebtoken");
const mailSender = require("../services/mailSender");

class AuthController {
  async login(req, res, next) {
    passport.authenticate(
      "local",
      {
        usernameField: "email",
        passwordField: "password",
        session: false,
      },
      async (err, user, trace) => {
        if (err || !user) {
          throw new Error(trace.message || "Authentication error");
        }

        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "3h",
            audience: process.env.HOST,
          },
        );

        user.token = token;

        try {
          await User.updateToken(user);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }

        res.send({ token: user.token });
      },
    )(req, res, next);
  }
 
  
  // router.post("/social/google", (req, res) =>
  //   passport.authenticate(
  //     "google",
  //     {
  //       scope: ["email", "profile"],
  //     },
  //     async (err, user, trace) => {
  //       if (err || !user) {
  //         throw new Error(trace.message || "Authentication error");
  //       }
  //       console.log("GOOGLE USER:", user);
  //       // @TODO: Match Google to system user and get appropriate one from DB [...]
  //       const jwtToken = jwt.sign(user, process.env.JWT_SECRET, {
  //         expiresIn: "1d",
  //         audience: process.env.HOST,
  //       });

  //       res.send({ token: jwtToken });
  //     },
  //   )(req, res),
  // );

  async registration(req, res, next) {
    const emailTrim = req.body.email.trim();
    if (!emailTrim) {
      return res.status(400).send("Enter username(email)!");
    }
    if (!req.body.password) {
      return res.status(400).send("Enter password!");
    }

    const userInDb = await User.findByEmail(emailTrim);

    if (userInDb) {
      return res
        .status(400)
        .send(
          "Sorry, user with the same login is registered. Plase change your email, and try again",
        );
    } else {
      const user = {
        email: emailTrim,
        password: bcrypt.hashSync(req.body.password, 10),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        university: req.body.university,
        phone_number: req.body.phone_number,
        data: req.body.data,
        work_place: req.body.work_place,
        token: uuidv4(),
      };

      const linkEmailVerify =
        "http://" + req.get("host") + "/auth/verify/" + user.token;

      const mailOptions = {
        from: process.env.MAIL_AMDIN_USER,
        to: user.email,
        subject: "Confirm your email on Mikna social network",
        html:
          "<p>Hello our new user<p>, <br> <a href=" +
          linkEmailVerify +
          ">Click to verify your account</a>",
      };
      //  console.log(mailOptions);
      try {
        mailSender.sendMail(mailOptions, (error) => {
          if (error) {
            res.json({ error: error.message });
          } else {
            res.send("Approve link has been sent to email");
          }
        });
        await User.createUser(user);
        //res.json("User registered successfully!");
      } catch (error) {
        return next(
          res.status(400).send(`Broken to registration new user - ${error}`),
        );
      }
    }
  }

  async emailVerify(req, res) {
    const userId = await User.findByToken(req.params.token);
    if (userId) {
      await User.setActive(userId.id);
      res.send("Email has been verified");
    } else {
      res.send("Sorry, email not verify");
    }
  }

  async logout(req, res, next) {
    const { email } = req.body;
    try {
      await User.deleteToken(email);
      req.logout();
      res.redirect("/");
    } catch (error) {
      return next(res.status(400).send(`Not delete userToken - ${error}`));
    }
  }
}
module.exports = new AuthController();
