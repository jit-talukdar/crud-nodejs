const validator = require('validator');
const fs = require('fs');

const Registration = (req, res, next) => {
    const errors = {};
    const name = nameValidate(req.body.name);
    const phone = phoneNumberValidate(req.body.phone);
    const email = emailValidate(req.body.email);
    const pwd = passwordValidate(req.body.pwd);

    if(name) {
        errors.name = name;
    }

    if(email) {
        errors.email = email;
    }

    if(phone) {
        errors.phone = phone;
    }

    if(pwd) {
        errors.pwd = pwd;
    }

    if(Object.keys(errors).length) {
        const filePath = "./uploads/" + req.body.filename;
        fs.unlinkSync(filePath);
        res.status(500).json(errors);
    } else {
        next();
    }
};

const Login = (req, res, next) => {
    const errors = {};
    const phone = phoneNumberValidate(req.body.phone);
    // const pwd = passwordValidate(req.body.pwd);

    if(phone) {
        errors.phone = phone;
    }

    // if(pwd) {
    //     errors.pwd = pwd;
    // }

    if(Object.keys(errors).length) {
        res.status(403).json(errors);
    } else {
        next();
    }
};

const phoneNumberValidate = function(phone) {
    if(validator.isEmpty(phone) || !validator.isNumeric(phone) || !validator.isLength(phone, { min: 10, max: 10 })) {
        return "Provide a correct 10 digit phone number";
    } else { return null; }
};

const passwordValidate = function(pwd) {
    if(validator.isEmpty(pwd) || !validator.isLength(pwd, { min: 6, max: 8 })) {
        return "Password length should be from 6 to 8 characters";
    } else { return null; }
};

const nameValidate = function(name) {
    if(validator.isEmpty(name)) {
        return "Provide a valid name";
    } else { return null; }
};

const emailValidate = function(email) {
    if(validator.isEmpty(email) || !validator.isEmail(email)) {
        return "Provide a valid email address";
    } else { return null; }
};

module.exports.RegistrationValidation = Registration;
module.exports.LoginValidation = Login;