const express = require('express');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');

const stockSchema = mongoose.Schema({
    id: {
        type: ObjectId,
        required: true,
        ref: "Product"
    },
    name: {
        type: String,
        required: [true, "please provide a name for your product"],
        trim: true, // it  will remove spaces before and after of words
        unique: true, // will not take same name twice
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [50, "Name must be less than 50 characters"]
    },
    description: {
        type: String,
        required: [true, "please provide a description for your product"],
    },
    unit: {
        type: String,
        required: [true, "please provide a unit for your product"],
        enum: {
            values: ['kg', 'liter', 'pcs', 'bag'],
            message: "Unit can't be {VALUES}, must be either kg, liter or pcs"
        }
    },
    imageURLs: [{
        type: String,
        required: [true, "please provide a image URL for your product"],
        // validate: {
        //     validator: (value) => {
        //         if (!Array.isArray(value)) {
        //             return false;
        //         }
        //         let isValid = true;
        //         value.forEach(url => {
        //             if (!validator.isURL(url)) {
        //                 isValid = false;
        //             }
        //         });
        //         return isValid;
        //     },

        //     message: "please provide a valid image URL for your product",
        // }
    }],
    price: {
        type: Number,
        required: [true, "please provide a price for your product"],
        min: [0, "Price must be greater than 0"],
        max: [1000000000, "Price must be less than 1000000000"]
    },
    quantity: {
        type: Number,
        required: [true, "please provide a quantity for your product"],
        min: [0, "quantity cannot be negative"],
        max: [1000000000, "quantity must be less than 1000000000"]
    },
    category: {
        type: String,
        required: [true, "please provide a category for your product"],
    },
    brand: {
        name: {
            type: String,
            required: true,
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true,
        }
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['in-stock', "out-of-stock", "discontinued"],
            message: `Status can't be ''{VALUE}'', must be either in-stock, out-of-stock or discontinued`
        }
    },
    store: {
        name: {
            type: String,
            require: [true, "please provide a store name!! "],
            trim: true,
            lowercase: true,
            maxLength: 100,
            enum: {
                values: ["dhaka", "chittgong", "kulna", "sylhet", "barisal"],
                message: "{VALUE} is not a valid store name.."
            }
        },
        id: {
            type: ObjectId,
            required: true,
            ref: "Store",
        },
    },
    suppliedBy: {
        name: {
            type: String,
            require: [true, "please provide a store name!! "],
            trim: true,
            lowercase: true,
        },
        id: {
            type: ObjectId,
            ref: "Supplier",
        }
    },

}, {
    timestamps: true,
});


const Stock = mongoose.model('Stock', stockSchema);


module.exports = Stock;