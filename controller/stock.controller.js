// const Stock = require('../models/Stocks');
const { getStocksServices, createStockService, updateStockService, deleteStockService, bulkUpdateService, bulkDeleteStockService, getStockByIdService } = require('../services/stock.services');

module.exports.getStock = async (req, res, next) => {

    try {

        //---------------------------------------------------------------- filtering ----------------------------------------------------------------
        console.log(req.query);
        let filtered = { ...req.query };
        console.log('filtered', filtered);


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
        // const stocks = await getStocksServices(filtered);

        const stocks = await getStocksServices(filtered, queries);
        console.log(stocks.length);



        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved all stocks',
            data: stocks
        })



    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message,
        });
    }
}



module.exports.postStock = async (req, res, next) => {
    try {
        const result = await createStockService(req.body)


        // result.logger()
        res.status(200).json({
            status: 'success',
            message: 'Successfully created a new stock',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message,
        })
    }

}
exports.getStockById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await getStockByIdService(id)

        res.status(200).json({
            status: 'success',
            message: 'Successfully created a new stock',
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message,
        })
    }
}


exports.updateStock = async (req, res) => {

    try {
        const { id } = req.params
        console.log(id);
        const result = await updateStockService(id, req.body)

        console.log(result);

        res.status(200).json({
            status: 'success',
            message: 'Successfully updated stock',
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
            "id": "id of stock",
            "data": {
                "price": "price of stock",
            }
        },
        {
            "id": "id of stock",
            "data": {
                "price": "price of stock",
            }
        }
    ] */
        console.log(req.body);
        const result = await bulkUpdateService(req.body);
        // const result = await bulkUpdateService();

        res.status(200).json({
            status: 'success',
            message: 'Successfully updated  stocks',

        })

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message,
        })
    }
};



exports.deleteStock = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await deleteStockService(id);

        if (!result.deletedCount) {
            return res.status(400).json({
                status: 'failed',
                message: "couldn't found any stock",
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'Successfully deleted the given stocks',

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
        // const data = await req.body.forEach(stockId => {
        //     console.log("stockId", stockId);
        // })

        // const filtered = await req.body.forEach(stockId => { stockId });
        // console.log("filtered", filtered);

        // const result = await bulkDeleteStockService(req.body);
        const result = await bulkDeleteStockService();

        res.status(200).json({
            status: 'success',
            message: 'Successfully deleted the given  stock',

        })




    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message,
        })
    }
};





exports.fileUpload = async (req, res, next) => {
    try {
        // res.status(200).json(req.file) // for single image file upload request
        res.status(200).json(req.files) // for multiple images files upload request
        // console.log("upload");
        // console.log("fileUpload", req.file);
        // res.send(req.file);

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message,
        })
    }
};