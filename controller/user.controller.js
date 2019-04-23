const bcrypt = require('bcrypt');
const usermodel = require('../model/user.model');
const fs = require('fs');

const register = (req, res, next) => {
    // console.log(req.body);
    usermodel.register(req.body, function(error, rs) {
        resp = {};
        if (error) {
            const filePath = "./uploads/" + req.body.filename;
            fs.unlinkSync(filePath);
            next(new Error(error.code));
        } else {
            if (rs.affectedRows) {
                resp.status = 200;
                resp.msg = "User Created";
                res.status(200).json(resp);
            } else {
                // Through error if unable to insert
                resp.status = 500;
                resp.msg = "ERROR_INSERT";
                res.status(500).json(resp);
            }
        }
    });

};

const login = (req, res) => {
    // console.log(req.body);
    usermodel.login(req.body, function(error, rs) {
        resp = {};
        if (error) {
            resp.status = 403;
            resp.msg = error.code;
            res.status(403).json(resp);
        } else {
            bcrypt.compare(req.body.pwd, rs[0].pwd, function(err, bool){
                if (error) {
                    resp.status = 500;
                    resp.msg = "INTERNAL_ERROR";
                    res.status(500).json(resp);
                }
                if (bool) {
                    delete rs[0].pwd;
                    resp.status = 200;
                    resp.data = rs[0];
                    resp.msg = "SUCCESS";
                    res.status(200).json(resp);
                } else {
                    resp.status = 400;
                    resp.msg = "USERNAME_PASSWORD_MISMATCH";
                    res.status(400).json(resp);
                }
            });
        }
    });
};

module.exports.register = register;
module.exports.login = login;