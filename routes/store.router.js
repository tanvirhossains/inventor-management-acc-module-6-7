const express = require('express');

const storeRouter = express.Router()
const storeContoller = require('../controller/store.controller');

storeRouter.route("/")
    .get(storeContoller.getStore)
    .post(storeContoller.postStore)


storeRouter.route("/:id")
    .get(storeContoller.getStoreById)



module.exports = storeRouter; 