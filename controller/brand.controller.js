// const Product = require('../models/Products');

const { createBrandService, getBrandsService, getBrandsByIdService, patchBrandByIdService } = require("../services/brand.services")

module.exports.createBrand = async (req, res, next) => {

    try {
        const result = await createBrandService(req.body)

        res.status(200).json({
            status: "Success",
            message: "Product created successfully.",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }

}
module.exports.getBrands = async (req, res, next) => {

    const brands = await getBrandsService()

    res.status(200).json({
        status: "Success",
        message: "Product gotten successfully.",
        data: brands
    })

    try {

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }

}
module.exports.getBrandsById = async (req, res, next) => {

    const { id } = req.params;
    const brand = await getBrandsByIdService(id)

    if (!brand) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }

    res.status(200).json({
        status: "Success",
        message: "Product found successfully by given id..",
        data: brand
    })

    try {

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }

}
module.exports.patchBrandsById = async (req, res, next) => {

    const { id } = req.params;
    const brand = await patchBrandByIdService(id, req.body)

    if (!brand.modifiedCount) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
    console.log(brand);

    res.status(200).json({
        status: "Success",
        message: "Product updated successfully..",

    })

    try {

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }

}