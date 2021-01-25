require('dotenv').config();
const host = process.env.HOST;
const port = process.env.PORT;

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const passport = require('./services/auth/passport');
const authRequest = require('./middleware/request-auth');

const userRouters = require('./routes/userRouter');
const postRouters = require('./routes/postsRouter');
const authRoutes = require('./routes/authRouter');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(express.json());
app.use(passport.initialize());
app.use(authRequest);

app.use('/auth', authRoutes);
app.use('/user', userRouters);
app.use('/posts', postRouters);

app.get('/', (req, res) => {
  res.send('<h1 style="text-align:center; color: green;">Hello everyone on my education express page!</h1>');
});

app.use((req, res) => {
  res.status(404).send('<h1 style="text-align:center; color: red;">Not found page - error 404</h1>');
});

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send(`${err} Oh sorry, server say - error 500`);
});

app.listen(port, ()=> {
    console.log(`App server started. App listening at http://${host}:${port}`);
});
