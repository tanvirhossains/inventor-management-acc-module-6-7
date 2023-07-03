const express = require('express');

const supplierRouter = express.Router()
const supplierContoller = require('../controller/supplier.controller');

supplierRouter.route("/")
    .get(supplierContoller.getSupplier)
    .post(supplierContoller.postSupplier)


supplierRouter.route("/:id")
    .get(supplierContoller.getSupplierById)



module.exports = supplierRouter; 