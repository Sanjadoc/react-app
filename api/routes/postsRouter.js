const router = require('express').Router();
const db = require('../services/db');
const checkAuth = require('../middleware/acl').checkAuthorized;

router.get('/', [checkAuth, (req, res) => {
    db.select().from('posts').then(
        data => { 
            res.send(data); 
        }
    );
}]);

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