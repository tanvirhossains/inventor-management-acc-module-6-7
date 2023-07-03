const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const productRouter = require('./routes/Product.router');
const brandRouter = require('./routes/Brand.router');
const storeRouter = require('./routes/store.router');
const supplierRouter = require('./routes/Supplier.router');
const stockRouter = require('./routes/Stock.router');



//middleware
app.use(express.json());
app.use(cors())

app.use('/api/v1/products', productRouter)
app.use('/api/v1/brands', brandRouter)
app.use('/api/v1/stores', storeRouter)
app.use('/api/v1/suppliers', supplierRouter)
app.use('/api/v1/stocks', stockRouter)

module.exports = app;