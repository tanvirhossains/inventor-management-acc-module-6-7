const express = require('express');

const brandRouter = express.Router();
const brandController = require('../controller/brand.controller');


brandRouter.route('/')
    .get(brandController.getBrands)
    .post(brandController.createBrand)

brandRouter.route('/:id')
    .get(brandController.getBrandsById)
    .patch(brandController.patchBrandsById)
    


module.exports = brandRouter;