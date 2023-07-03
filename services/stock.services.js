const { ClientSession } = require("mongodb");
const Stock = require("../models/Stock");
const Brand = require("../models/Brand");


exports.getStocksServices = async (filteres, queries) => {
    // const stocks = await Stock.find({   })
    // const stocks = await Stock.find({_id:'648ed732a3ccd2d13967c2da'})
    // const stocks = await Stock.find({ status: 'out-of-stock' }) //
    // const stocks = await Stock.find({ $or: [{ name: "Mouse" }, { _id: '648edd0e68d752ad7dcda229' }] }) //
    // const stocks = await Stock.find({ status: { $ne: "in-stock" } }) //ne = not equal to "in-stock"
    // const stocks = await Stock.find({}, 'name price -_id') //only name price will be returned
    // const stocks = await Stock.find({}).where("name").equals("Orange")
    // const stocks = await Stock.find({}).where("pirce").gt(100)
    // const stocks = await Stock.where("quantity").gt(100).limit(2)
    // const stocks = await Stock.where('name').all    (['Mango', 'Orange']);
    // const stocks = await Stock.where('status').equals('out-of-stock')
    // const stocks =  await Stock.where('name').equals(/\w/).where('price').gt(400)

    // const stockService = await Stock.where('name').equals(/\w/).where('price').gt(400)
    // const stockService = await Stock.find({"status":"in-stock", "limit":3})
    // const stockService = await Stock.find(queryData).sort("name price")
    // const stockService = await Stock.find({}).sort(-"name quantity")

    // const stockService = await Stock.find({}).sort(queries.sortBy).select(queries.fields)
    // const stockService = await Stock.find({ price: { $gt: 200 } })
    // const stockService = await Stock.find(filtered).skip(queries.skip).limit(queries.limit).sort(queries.sortBy).select(queries.fields)
    const stocks = await Stock.find(filteres)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)

    const totalStock = await Stock.countDocuments(filteres)
    const page = Math.ceil(totalStock / queries.limit)

    console.log('pageCount: ', pageCount);

    return { totalStock, page, stocks, };
}

// 



exports.getStockByIdService = async (stockId) => {


    const stockGottenById = await Stock.find({ _id: stockId }).populate("store.id").populate("suppliedBy.id").populate("brand.id")

    return stockGottenById;
}

exports.createStockService = async (data) => {


    const stock = new Stock(data);
    if (stock.quantity === 0) {
        stock.status = "out-of-stock";
    }
    const createStock = await stock.save()

    return createStock;
}


exports.updateStockService = async (stockId, data) => {
    //---------------------------------------------------------------- options:1----------------------------------------------------------------
    // const stock = await Stock.updateOne({ _id: stockId }, { $set: data })
    // return stock;

    //---------------------------------------------------------------- options:3----------------------------------------------------------------
    // const stock = await Stock.updateOne({ _id: stockId }, { $set: data }, {
    //     runValidators: true
    // })
    // return stock;

    // ---------------------------------------------------------------- option:2 
    const stock = await Stock.findById(stockId);
    // const stock = await Stock.findOne(stockId);
    const result = await stock.set(data).save();
    return result;

}



exports.bulkUpdateService = async (data) => {
    // ---------------------------------------------------------------- update stocks with same data for all given id stocks

    // const stocks = await Stock.updateMany({ _id: data.ids }, data.data, {
    //     runValidation: true
    // });
    // return stocks;


    // ---------------------------------------------------------------- update stocks with different data for different stock
    const stocks = [];
    data.forEach(stock => {
        stocks.push(Stock.updateOne({ _id: stock.id }, stock.data));

    });
    const result = await Promise.all(stocks);
    // const result = await Stock.updateMany({}, { $set: { unit: 'kg' } });
    console.log("promise: ", result);
    return result;

};

exports.deleteStockService = async (stockId) => {

    const result = await Stock.deleteOne({ _id: stockId });

    console.log("result: ", result);
    return result;
};

exports.bulkDeleteStockService = async (ids) => {

    // console.log("ids:", ids);

    // const result = await Stock.deleteMany({_id:ids});
    const result = await Stock.deleteMany({})
    console.log(result);
    return result;

    // console.log(data);
    // // const stocks = [];

    // const forEachData = data.forEach(async (stock) => {
    //     const output = await Stock.findById(stock)

    //     if (!output) {
    //         console.log("output is null",);
    //         return output;
    //     }
    //     console.log("output found 1");
    //     // const value =await stocks.push(Stock.deleteOne({ _id: stock }));
    //     const power = await Stock.deleteOne({ _id: stock });
    //     console.log("power:", power);
    //     if (power.deletedCount === 0) {
    //         console.log("deleted stocks: 1");
    //     }
    //     return power;




    // })

    // // const result = await Promise.all(stocks);
    // // if(result.deletedCount === 0) {
    // //     console.log("deleted stocks: 0");
    // // }

    // console.log("foreach stocks:", forEachData);
    // return forEachData;
};