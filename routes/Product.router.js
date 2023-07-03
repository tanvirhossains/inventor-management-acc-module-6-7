const express = require('express');
const productRouter = express.Router();
const productController = require('../controller/product.controller')


// const multer = require('multer')
// const uploader = multer({ dest: "images/" })

const uploader = require('../middleware/uploader');

// single photo uploader route 
// productRouter.route('/file-upload').post(uploader.single("image"), productController.fileUpload)
productRouter.route('/file-upload').post(uploader.array("image"), productController.fileUpload)

// <input type="file" name="image" placeholder="Upload a file" />
// const formData = new FormData();
// formData.append('image', formData)

// productRouter.route('/bulk-update').patch(productController.bulkUpdate)
// productRouter.route('/bulk-delete').delete(productController.bulkDelete)


productRouter.route('/')
    .get(productController.getProduct)
    .post(productController.postProduct)




productRouter.route('/:id')
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = productRouter;