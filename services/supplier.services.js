const { ClientSession } = require("mongodb");
const Supplier = require("../models/Supplier");





module.exports.createSupplierService = async (data) => {

    // const createSupplier = await Supplier.create(data);
    const suppliers = new Supplier(data);

    const createSupplier = await suppliers.save();
    return createSupplier;
}


// exports.getSupplierService = async (limit, page, select) => {
exports.getSupplierService = async () => {

    const supplier = await Supplier.find({})
    return supplier;
}
exports.getSupplierByIdService = async (id) => {

    const supplier = await Supplier.findOne({ _id: id })
    return supplier;
}

exports.patchSupplierByIdService = async (id, bodyData) => {

    const supplier = await Supplier.updateOne({ _id: id }, bodyData, {
        runValidation: true
    })
    return supplier;
}