var express = require('express');
var app = express();
const port = 3000;

app.get('/:name',function(req, res) {
    res.send('Hello ' + req.params.name+ '!');
});

app.listen(port, ()=> {
    console.log(`App server started. App listening at http://localhost:${port}`);
});

