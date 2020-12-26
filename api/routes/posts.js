const Router = require('express');
const router = new Router();

router.get('/', (req, res) => {
    res.send('<h1 style="text-align:center; color: green;">Hello everyone on my education express page!</h1>');
});

router.get('/user/:id', (req, res) => {
    res.send('<h2>Hello user - ' + `${req.params.id}` + '</h2>')
});

router.post('/', (req, res) => {
    res.send('Hello, from post method - Homepage)');
});

router.put('/user/:id', (req, res) => {});
router.delete('/user/:id', (req, res) => {});

module.exports = router;