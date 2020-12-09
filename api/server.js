require('dotenv').config();
const host = process.env.HOST;
const port = process.env.PORT;

const express = require('express');
const app = express();


app.get('/', function(req, res) {
    res.send('Hello on my education express page!');
});

// not need now
// app.get('/:name', function(req, res) {
//     res.send('Hello ' + req.params.name+ '!');
// });

app.use( function(err, res) {
    console.log(err.stack);
    res.status(500).send('Oh sorry, server say - error 500');
})

app.listen(port, ()=> {
    console.log(`App server started. App listening at http://${host}:${port}`);
});



