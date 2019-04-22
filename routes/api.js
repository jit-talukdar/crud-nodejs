const express = require('express');
const api = express.Router();
const UserController = require('../controller/user.controller');
const Validate = require('../config/validation');
const fileUpload = require('../config/fileupload');

api.all('/', function(req, res, next) {
    res.status(404).json({msg: "Not Found"});
});

api.post('/register', [fileUpload.singleImgUpload, Validate.RegistrationValidation], UserController.register);

api.post('/login', Validate.LoginValidation, UserController.login);

module.exports = api;