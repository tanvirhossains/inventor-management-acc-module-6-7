const express = require('express');

const productRouter = express.Router();
const productController = require('../controller/product.controller')

productRouter.route('/bulk-update').patch(productController.bulkUpdate)
productRouter.route('/bulk-delete').delete(productController.bulkDelete)


productRouter.route('/')
    .get(productController.getProduct)
    .post(productController.postProduct)




productRouter.route('/:id')
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = productRouter;