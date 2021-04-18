require("dotenv").config();
const host = process.env.HOST;
const port = process.env.PORT;

const cors = require("cors");
const express = require("express");
const app = express();

const passport = require("./services/auth/passport");
const authRequest = require("./middleware/request-auth");

const userRouters = require("./routes/userRouter");
const postRouters = require("./routes/postsRouter");
const authRoutes = require("./routes/authRouter");
const refreshTokensRouter = require("./routes/refreshTokensRouter");

app.use(express.urlencoded({ 
  extended: true,
  limit: "20mb",
  parameterLimit: 20000,
}));
app.use(express.json({ limit: "20mb" }));
app.use(passport.initialize());

app.use(cors(
  {
    "origin": ["http://localhost:3001"],
    "methods": "GET,PUT,POST,DELETE",
    "optionsSuccessStatus": 200
  }
));

app.use(authRequest);
app.use("/auth", authRoutes);
app.use("/user", userRouters);
app.use("/posts", postRouters);
app.use("/refresh-tokens", refreshTokensRouter);

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align:center; color: green;'>Hello everyone on my education express page!</h1>",
  );
});

app.use((req, res) => {
  res
    .status(404)
    .send(
      "<h1 style='text-align:center; color: red;'>Not found page - error 404</h1>",
    );
});

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send(`${err} Oh sorry, server say - error 500`);
});

app.listen(port, () => {
  console.log(`App server started. App listening at http://${host}:${port}`);
});