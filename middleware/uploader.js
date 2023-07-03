const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) // for unique image if the name of two users name become same then this is the best way to make it distinguishable 
        // cb(null, file.fieldname + '-' + uniqueSuffix )
        cb(null, uniqueSuffix + "-" + file.originalname)
    }
})

const uploader = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const supportedImages = /png|jpg|JPG/
        const extensions = path.extname(file.originalname);

        if (supportedImages.test(extensions)) {
            cb(null, true);
        } else {
            cb(new Error("Must be a png/jpeg/jpg image "))
        }


    },
    limits: {
        fileSize: 50000000
    }

})

module.exports = uploader;