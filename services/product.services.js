const { ClientSession } = require("mongodb");
const Product = require("../models/Products");


exports.getProductsServices = async (filtered, queries) => {
    // const products = await Product.find({   })
    // const products = await Product.find({_id:'648ed732a3ccd2d13967c2da'})
    // const products = await Product.find({ status: 'out-of-stock' }) //
    // const products = await Product.find({ $or: [{ name: "Mouse" }, { _id: '648edd0e68d752ad7dcda229' }] }) //
    // const products = await Product.find({ status: { $ne: "in-stock" } }) //ne = not equal to "in-stock"
    // const products = await Product.find({ price: { $lt: 100 } }) //gt = getter than 
    // const products = await Product.find({ name: { $in: ['Orange', 'Mango'] } }) //gt = getter than 
    // const products = await Product.find({}, 'name price -_id') //only name price will be returned
    // const products = await Product.find({}).sort({ price: -1 })
    // const products = await Product.find({}).select({ name:1})
    // const products = await Product.find({}).where("name").equals("Orange")
    // const products = await Product.find({}).where("pirce").gt(100)
    // const products = await Product.where("quantity").gt(100).limit(2)
    // const products = await Product.where('name').all    (['Mango', 'Orange']);
    // const products = await Product.where('status').equals('out-of-stock')
    // const products =  await Product.where('name').equals(/\w/).where('price').gt(400)
    // const products = await Product.findById("648edf5f4378b91deb6fd1e3")
    // const products = await Product.findById(undefined) // null is returned

    // const productService = await Product.where('name').equals(/\w/).where('price').gt(400)
    // const productService = await Product.find({"status":"in-stock", "limit":3})
    // const productService = await Product.find(queryData).sort("name price")
    // const productService = await Product.find({}).sort(-"name quantity")

    // const productService = await Product.find({}).sort(queries.sortBy).select(queries.fields)
    // const productService = await Product.find({ price: { $gt: 200 } })
    const productService = await Product.find(filtered).skip(queries.skip).limit(queries.limit).sort(queries.sortBy).select(queries.fields)

    const productCount = await Product.countDocuments(productService)
    const pageCount = Math.ceil(productCount / queries.limit)
    console.log('pageCount: ', pageCount);
    return { productCount, productService, };
}

// 
exports.createProductService = async (data) => {


    const product = new Product(data);
    if (product.quantity === 0) {
        product.status = "out-of-stock";
    }
    const createProduct = await product.save()


    // const createProduct =await Product.create(data);
    return createProduct;
}


exports.updateProductService = async (productId, data) => {
    //---------------------------------------------------------------- options:1----------------------------------------------------------------
    // const product = await Product.updateOne({ _id: productId }, { $set: data })
    // return product;

    //---------------------------------------------------------------- options:3----------------------------------------------------------------
    // const product = await Product.updateOne({ _id: productId }, { $set: data }, {
    //     runValidators: true
    // })
    // return product;

    // ---------------------------------------------------------------- option:2 
    const product = await Product.findById(productId);
    // const product = await Product.findOne(productId);
    const result = await product.set(data).save();
    return result;

}



exports.bulkUpdateService = async (data) => {
    // ---------------------------------------------------------------- update products with same data for all given id products

    // const products = await Product.updateMany({ _id: data.ids }, data.data, {
    //     runValidation: true
    // });
    // return products;


    // ---------------------------------------------------------------- update products with different data for different product
    const products = [];
    data.forEach(product => {
        products.push(Product.updateOne({ _id: product.id }, product.data));

    });
    const result = await Promise.all(products);
    // const result = await Product.updateMany({}, { $set: { unit: 'kg' } });
    console.log("promise: ", result);
    return result;

};

exports.deleteProductService = async (productId) => {

    const result = await Product.deleteOne({ _id: productId });

    console.log("result: ", result);
    return result;
};

exports.bulkDeleteProductService = async (ids) => {

    // console.log("ids:", ids);

    // const result = await Product.deleteMany({_id:ids});
    const result = await Product.deleteMany({})
    console.log(result);
    return result;

    // console.log(data);
    // // const products = [];

    // const forEachData = data.forEach(async (product) => {
    //     const output = await Product.findById(product)

    //     if (!output) {
    //         console.log("output is null",);
    //         return output;
    //     }
    //     console.log("output found 1");
    //     // const value =await products.push(Product.deleteOne({ _id: product }));
    //     const power = await Product.deleteOne({ _id: product });
    //     console.log("power:", power);
    //     if (power.deletedCount === 0) {
    //         console.log("deleted products: 1");
    //     }
    //     return power;




    // })

    // // const result = await Promise.all(products);
    // // if(result.deletedCount === 0) {
    // //     console.log("deleted products: 0");
    // // }

    // console.log("foreach products:", forEachData);
    // return forEachData;
};