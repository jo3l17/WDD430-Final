const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/todos', require('./todos'));

module.exports = router;