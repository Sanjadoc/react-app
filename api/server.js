require("dotenv").config();
const host = process.env.HOST;
const port = process.env.PORT;

const cors = require("cors");
const express = require("express");
const app = express();

const ws = require("ws");
const db = require("./services/db");
const commentSocketServices = require("./services/commentSocketServices");

const passport = require("./services/auth/passport");
const authRequest = require("./middleware/request-auth");

const userRouters = require("./routes/userRouter");
const postRouters = require("./routes/postsRouter");
const authRoutes = require("./routes/authRouter");
const refreshTokensRouter = require("./routes/refreshTokensRouter");
const commentsRouter = require("./routes/commentsRouter");

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
app.use("/comments", commentsRouter);
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


//web socket
const wss = new ws.Server( {port: 4000},  () => {console.log("WebSoket port 4000"); });

wss.on("connection", function connection(ws) {
  ws.on("message", async function (message) {
    message = JSON.parse(message);
    const commentTable = "commentsPosts";
    const commentTableCommentId = "commentId";

    switch (message.event) {
      case "message":
        const mess = await commentSocketServices.insertInDb(message.data);
        const resObjNewMess = { event: "newMess", data: mess, };
        commentSocketServices.translationComments(wss, resObjNewMess);
        break;

      case "deleteComm":
          const { commentId, postId } = message.data;
          await db(commentTable).where(commentTableCommentId, commentId).del();
          const resObjDelMess = {event: "delMess", data: {commentId: commentId, postId: postId},
          }
      commentSocketServices.translationComments(wss, resObjDelMess);
      break;
    }
  });
});

//http
app.listen(port, () => {
  console.log(`App server started. App listening at http://${host}:${port}`);
});