const multer = require('multer');
const mimeTypesFilter = require('meanie-multer-mime-types-filter');

const fileRename = (req, file, cb) => {
    cb(null, Date.now()+'-'+file.originalname);
};

const destinationPath = (req, file, cb) => {
    cb(null, 'uploads/');
};

const IMG_MIME_TYPES = ['image/jpeg', 'image/png'];

const storage = multer.diskStorage({
    destination: destinationPath,
    filename: fileRename
});

const uploadSingleImg = multer({ storage: storage, fileFilter: mimeTypesFilter(IMG_MIME_TYPES) }).single('userfile');

const singleImg = function(req, res, next) {
    const resp = {};
    uploadSingleImg(req, res, function(err) {
        const file = req.file;
        if (!file) {
            next(new Error('MIME_TYPE_ERROR'));
        } else if(err) {
            next(new Error(err.code));
        } else {
            req.body.filename = req.file.filename;
            next();
        }
    });
    
};

module.exports.singleImgUpload = singleImg;