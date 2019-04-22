const express = require('express');
const app = express();
const router = require('./routes/router');

// for parsing json data in post request
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// To parse multipart/form-data first install multer
/**
 * var multer = require('multer');
 * var upload = multer();
 * app.use(upload.array());
 */
app.use('/', router);

module.exports = app;