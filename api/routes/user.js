const Router = require('express');
const router = new Router();

router.get('/', (req, res) => {
    res.send('<h1 style="text-align:center; color: green;">User lists: </h1>');
});

router.get('/:id', (req, res) => {
    res.send(`Get one user with ID: ${req.params.id}`);
});

router.get('/:id/friends', (req, res) => {
    res.send(`<h1 style="text-align:center; color: green;">Get all friends for user ID: ${req.params.id}: <h1>`);
});

router.post('/:id/create', (req, res) => {
    res.send(`Create user with ID: ${req.params.id}`);
});

router.put('/:id/update', (req, res) => {
    res.send(`Updated user with ID: ${req.params.id}`);
});

router.delete('/:id/delete', (req, res) => {
    res.send(`Deleted user with ID: ${req.params.id}`);
});

module.exports = router;