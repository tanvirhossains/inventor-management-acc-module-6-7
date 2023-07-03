// const Product = require('../models/Products');

const { createStoreService, getStoreService, getStoreByIdService, patchStoreByIdService } = require("../services/store.services")

module.exports.postStore = async (req, res, next) => {
    try {

        console.log(req.body);
        const result = await createStoreService(req.body)

        res.status(200).json({
            status: "Success",
            message: "Store created successfully.",
            stores: result
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }

}
module.exports.getStore = async (req, res, next) => {

    const stores = await getStoreService()

    res.status(200).json({
        status: "Success",
        message: "Stores gotten successfully.",
        data: stores
    })

    try {

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }

}
module.exports.getStoreById = async (req, res, next) => {

    const { id } = req.params;
    const brand = await getStoreByIdService(id)

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
module.exports.patchStoreById = async (req, res, next) => {

    const { id } = req.params;
    const brand = await patchStoreByIdService(id, req.body)

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