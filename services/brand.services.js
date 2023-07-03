const Brand = require("../models/Brand")
const Product = require("../models/Products");

exports.createBrandService = async (data) => {

    const result = await Brand.create(data)
    return result;
}



exports.getBrandsService = async () => {

    // const brands = await Brand.find({}).select("-products -suppliers")
    const brands = await Brand.find({}).populate("products")
    return brands;
}


exports.getBrandsByIdService = async (brandID) => {

    const brandById = await Brand.findOne({ _id: brandID })
    return brandById;
}

exports.patchBrandByIdService = async (brandID, data) => {

    const patchBrand = await Brand.updateOne({ _id: brandID }, data, { runValidation: true })
    return patchBrand;
}