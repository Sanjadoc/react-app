const Router = require('express');
const router = new Router();

router.get('/', (req, res) => {
    res.send('<h1 style="text-align:center; color: green;">Post lists: </h1>');
});

router.get('/:id', (req, res) => {
    res.send(`Get one post with ID: ${req.params.id}`);
});

router.post('/:id/create', (req, res) => {
    res.send(`Create post with ID: ${req.params.id}`);
});

router.put('/:id/update', (req, res) => {
    res.send(`Updated post with ID: ${req.params.id}`);
});

router.delete('/:id/delete', (req, res) => {
    res.send(`Deleted post with ID: ${req.params.id}`);
});

module.exports = router;