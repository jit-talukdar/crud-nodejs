const express = require('express');
const router = express.Router();
const api = require('./api');

router.all("/", function(req, res, next) {
    res.status(400).json({
        msg: "Bad Request"
    });
});

router.use('/api', api);

module.exports = router;