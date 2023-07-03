// const Product = require('../models/Products');

const { createSupplierService, getSupplierService, getSupplierByIdService, patchSupplierByIdService } = require("../services/supplier.services")

module.exports.postSupplier = async (req, res, next) => {
    try {

        console.log(req.body);
        const result = await createSupplierService(req.body)

        res.status(200).json({
            status: "Success",
            message: "Supplier created successfully.",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }

}
module.exports.getSupplier = async (req, res, next) => {

    const Suppliers = await getSupplierService()

    res.status(200).json({
        status: "Success",
        message: "Suppliers gotten successfully.",
        data: Suppliers
    })

    try {

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }

}
module.exports.getSupplierById = async (req, res, next) => {

    const { id } = req.params;
    const brand = await getSupplierByIdService(id)

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
module.exports.patchSupplierById = async (req, res, next) => {

    const { id } = req.params;
    const brand = await patchSupplierByIdService(id, req.body)

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