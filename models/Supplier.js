
const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const validator = require('validator');


const supplierSchema = mongoose.Schema({
    name: {
        type: String, // person name
        required: [true, "please provide a name for your product"],
        trim: true, // it  will remove spaces before and after of words
        unique: true, // will not take same name twice
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [50, "Name must be less than 50 characters"]
    },
    email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email.."],
        unique: true,
        trim: true,
    },
    brand: {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true,
        },
    },
    contactNumber: {
        type: String,
        require: [true, "Please provide a contact number"],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value)
            }
        },
        message: "Please provide a valid mobile number "
    },
    emergencyContactNumber: {
        type: String,
        require: [true, "Please provid a emergency contact number"],
        validate: {
            validator: (value) => {
                return validator.isMobilePhone(value)
            }
        },
        message: "Please provide a valid mobile number "
    },
    tradLicenceNumber: {
        type: Number,
        require: [true, "Please provide  your trad license number"],
    },
    presentAddress: {
        type: String,
        require: [true, "Please provide  your present address"],
    },
    parmanentAddress: {
        type: String,
        require: [true, "Please provide  your present address"],
    },
    location: {
        type: String,
        require: [true, "please provide a store name!! "],
        trim: true,
        maxLength: 100,
        lowercase: true,
        enum: {
            values: ["dhaka", "chittgong", "khulna", "sylhet", "barisal", "maymansingh"],
            message: "{VALUE} is not a valid store name.."
        }
    },
    imageURL: [{
        type: String,
        validate: [validator.isURL, "please provide a valid image url."]
    }],
    natioanalImageURL: [{
        type: String,
        required: [true, "please provide a image URL for your product"],
        validate: [validator.isURL, "please provide a valid image url."]
    }],
    status: {
        type: String,
        enum: ["active", "inactive", "discontinued"],
        default: "active"
    },

}, {
    timestamps: true,
});




const Supplier = mongoose.model('Supplier', supplierSchema);


module.exports = Supplier;