const router = require('express').Router();
const db = require('../services/db');
const User = require('../models/user');
const passport = require('../services/auth/passport');
const { v4: uuidv4 } = require('uuid');

const bcrypt = require('bcrypt');


// const controller = require('../controllers/authController');

// router.post('/login', controller.signIn);
// router.post('/registration', controller.signUp);

router.post('/login', (req, res, next) =>
  passport.authenticate(
    'local',
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (err, user, trace) => {
      if (err || !user) {
        next(res.send(trace.message || 'Authentication error!'));
      }

      console.log(user);

      // Generate token for user and actualize:
      user.token = uuidv4();
      console.log(' user.token - ' + user.token);
      
      await User.updateUser(user);

      res.send({ token: user.token });
    },
  )(req, res, next)
);

router.post('/registration', async (req, res, next) => {

  const {email, password} = req.body;

  const emailTrim = email.trim();
  if (!emailTrim) { return res.status(400).send('Enter username(email)!'); }
  if (!password.trim()) { return res.status(400).send('Enter password!'); }

  const userInDb = await User.findByName(emailTrim);
  
  if (userInDb) {
      return res.status(400).send('Sorry, user with the same login is registered. Plase change your login, and try again');
  } else  {
    try {
       await User.createUser(emailTrim, password);
       res.json('User registered successfully!');
    } catch (error) {
        return next(res.status(400).send(`Broken to registration new user - ${error}`)); 
    }
  }
});

router.post('/logout', async function(req, res, next) {
  const {email} = req.body;
  try {
    await User.deleteUserToken(email);
    req.logout();
    res.redirect('/');
  } catch (error) {
    return next(res.status(400).send(`Not delete userToken - ${error}`)); 
  }
});

module.exports = router;
