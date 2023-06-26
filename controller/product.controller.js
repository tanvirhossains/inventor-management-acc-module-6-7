
const Product = require('../models/Products');
const { getProductsServices, createProductService, updateProductService, deleteProductService, bulkUpdateService, bulkDeleteProductService } = require('../services/product.services');

module.exports.getProduct = async (req, res, next) => {

    try {
        console.log('Getting Product');
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
        const products = await getProductsServices();
        console.log(products.length);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved all products',
            data: products
        })

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message,
        });
    }
}



module.exports.postProduct = async (req, res, next) => {
    // save or create a new product
    try {

        // --- ------------------save a new product
        // const product = new Product(req.body)
        // if (product.quantity === 0) {
        //     product.status = "out-of-stock";
        // }
        // const result = await product.save()
        const result = await createProductService(req.body)


        // create a new product option:2
        // const result = await Product.create(req.body)
        // const result = await createProductService(req.body)

        result.logger()
        res.status(200).json({
            status: 'success',
            message: 'Successfully created a new product',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message,
        })
    }

}



exports.updateProduct = async (req, res) => {

    try {
        const { id } = req.params
        console.log(id);
        const result = await updateProductService(id, req.body)

        console.log(result);

        res.status(200).json({
            status: 'success',
            message: 'Successfully updated product',
        })


    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message,
        })
    }

}
exports.bulkUpdate = async (req, res) => {
    try {
        console.log(req.body);
        const result = await bulkUpdateService(req.body);

        res.status(200).json({
            status: 'success',
            message: 'Successfully updated  products',

        })

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message,
        })
    }
};



exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await deleteProductService(id);

        console.log("deleteprodu: ", result);
        if (!result.deletedCount) {
          return  res.status(400).json({
                status: 'failed',
                message: "coudn't found any product",
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Successfully deleted the given products',

        })

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message,
        })
    }
};


exports.bulkDelete = async (req, res, next) => {
    try {

        //---------------------------------------------------------------- tried but not implemented
        // const data = await req.body.forEach(productId => {
        //     console.log("productId", productId);
        // })

        // const filtered = await req.body.forEach(productId => { productId });
        // console.log("filtered", filtered);

        const result = await bulkDeleteProductService(req.body);

        res.status(200).json({
            status: 'success',
            message: 'Successfully deleted the given  product',

        })




    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message,
        })
    }
};