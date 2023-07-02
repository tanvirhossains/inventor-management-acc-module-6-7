// const Product = require('../models/Products');
const { getProductsServices, createProductService, updateProductService, deleteProductService, bulkUpdateService, bulkDeleteProductService } = require('../services/product.services');

module.exports.getProduct = async (req, res, next) => {

    try {

        //---------------------------------------------------------------- filtering ----------------------------------------------------------------
        console.log(req.query);
        let filtered = { ...req.query };
        console.log('filtered', filtered);

        // --> gt, lt, gte, lte ->
        const filteredString = JSON.stringify(filtered);
        filtered = filteredString.replace(/\b(gt|lt|gte|lte)\b/g, match => `$${match}`);

        filtered = JSON.parse(filtered);
        console.log('matchedValue', filtered);

        console.log('filteredString', filteredString);

        // sort, page, limit -> exclude


        const excludFields = ["sort", "page", "limit"]
        excludFields.forEach(field => delete filtered[field]);

        // sort 
        // console.log("req query", req.query);
        // console.log("excludFields", filtered)


        //---------------------------------------------------------------- sorting and filtering----------------------------------------------------------------
        const queries = {};

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy
            console.log(sortBy);
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields
            console.log(fields);
        }


        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = Number(limit);
        }

        console.log(queries);
        // const products = await getProductsServices(filtered);

        const products = await getProductsServices(filtered, queries);
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
        /* // request.body is
           [
        {
            "id": "id of product",
            "data": {
                "price": "price of product",
            }
        },
        {
            "id": "id of product",
            "data": {
                "price": "price of product",
            }
        }
    ] */
        console.log(req.body);
        const result = await bulkUpdateService(req.body);
        // const result = await bulkUpdateService();

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

        if (!result.deletedCount) {
            return res.status(400).json({
                status: 'failed',
                message: "couldn't found any product",
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

        // const result = await bulkDeleteProductService(req.body);
        const result = await bulkDeleteProductService();

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