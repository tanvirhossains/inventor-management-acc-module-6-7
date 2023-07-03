const { ClientSession } = require("mongodb");
const Store = require("../models/Store");

// const product = require("../models/Store");




module.exports.createStoreService = async (data) => {

    // const createStore = await store.create(data);
    const store = new Store(data);

    const createStore = await store.save();
    return createStore;
}


// exports.getStoreService = async (limit, page, select) => {
exports.getStoreService = async () => {

    const store = await Store.find({})
    return store;
}
exports.getStoreByIdService = async (id) => {

    const store = await Store.findOne({ _id: id })
    return store;
}

exports.patchStoreByIdService = async (id, bodyData) => {

    const store = await Store.updateOne({ _id: id }, bodyData, {
        runValidation: true
    })
    return store;
}