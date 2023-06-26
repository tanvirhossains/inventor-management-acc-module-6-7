const express = require('express');
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name for your product"],
        trim: true, // it  will remove spaces before and after of words
        unique: true, // will not take same name twice
        minLength: [2, "Name must be at least 4 characters"],
        maxLength: [50, "Name must be less than 50 characters"]
    },
    description: {
        type: String,
        required: [true, "please provide a description for your product"],
    },
    price: {
        type: Number,
        required: [true, "please provide a price for your product"],
        min: [0, "Price must be greater than 0"],
        max: [1000000000, "Price must be less than 1000000000"]
    },
    unit: {
        type: String,
        required: [true, "please provide a unit for your product"],
        enum: {
            values: ['kg', 'liter', 'pcs'],
            message: "Unit can't be {VALUES}, must be either kg, liter or pcs"
        }
    },
    quantity: {
        type: Number,
        required: [true, "please provide a quantity for your product"],
        min: [0, "Quantity must be greater than 0"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        message: "Quantity must be an integer"
    },
    status: {
        type: String,
        enum: {
            values: ['in-stock', "out-of-stock", "discontinued"],
            message: `Status can't be ''{VALUE}'', must be either in-stock, out-of-stock or discontinued`
        }
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Supplier',
    //     required: [true, "please provide a supplier for your product"]
    // },
    // categories: [{
    //     name: {
    //         type: String,
    //         required: [true, "please provide a category for your product"]
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }],


}, {
    timestamps: true, // timestamp create automatically createdAt and updatedAt times 
    // _id: false,
});


// mongoose middleware for saving data: pre/ post
// this -->
productSchema.pre('save', function (next) {
    console.log("before save");

    if (this.quantity === 0) {
        this.status = "out-of-stock";
    }
    next();
})

productSchema.post('save', function (doc, next) {
    console.log("after save");

    next();
})


productSchema.methods.logger = function () {
    console.log(this);
    console.log(`Data saved for ${this.name}`);
}
// // SCHEMA 🔜 MODEL 🔜 QUERY



const Product = mongoose.model('Product', productSchema);


module.exports = Product;