const express = require('express');

const stockRouter = express.Router()
const stockContoller = require('../controller/stock.controller');

stockRouter.route("/")
    .get(stockContoller.getStock)
    .post(stockContoller.postStock)


stockRouter.route("/:id")
    .get(stockContoller.getStockById)



module.exports = stockRouter; 