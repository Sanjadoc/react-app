require('dotenv').config();
const host = process.env.HOST;
const port = process.env.PORT;

const express = require('express');
const app = express();

const userRouters = require('./routes/user');
const postRouters = require('./routes/posts');

app.use('/user', userRouters);
app.use('/posts', postRouters);

app.get('/', (req, res) => {
  res.send('<h1 style="text-align:center; color: green;">Hello everyone on my education express page!</h1>');
});

app.use((req, res) => {
  res.status(404).send('<h1 style="text-align:center; color: red;">Not found page - error 404</h1>');
});

app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Oh sorry, server say - error 500');
})

app.listen(port, ()=> {
    console.log(`App server started. App listening at http://${host}:${port}`);
});
