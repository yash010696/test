const express = require('express');
const router = express.Router({ caseSensitive: true });

const User = require('./user');

router.get('/time', (req, res) => res.send(new Date().toString()));
router.use('/v1/user', User);

module.exports = router