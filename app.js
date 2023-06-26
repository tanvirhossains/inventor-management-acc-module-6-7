const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const productRouter = require('./routes/Product.router');

//middleware
app.use(express.json());
app.use(cors())

app.use('/api/v1/products', productRouter)

module.exports = app;