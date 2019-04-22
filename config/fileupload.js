const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname);
    }
  });

const uploadSingle = multer({ storage: storage }).single('userfile');

const singleImg = function(req, res, next) {
    uploadSingle(req, res,function(err) {
        if(err) {
            resp.status = 403;
            resp.msg = err.code;
            res.status(403).json(resp);
        }
        req.body.filename = req.file.filename;
        next();
    });
};

module.exports.singleImgUpload = singleImg;