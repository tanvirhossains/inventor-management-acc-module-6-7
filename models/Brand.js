const mongoose = require("mongoose");
const validator = require("validator");

const { ObjectId } = mongoose.Schema.Types

const brandSchema = mongoose.Schema({
    products: [{
        type: ObjectId,
        ref: "Product"
    }],
    name: {
        type: String,
        require: [true, "please provide a brand name!! "],
        trim: true,
        maxLength: 100,
        unique: true,
        lowercase: true,
    },
    description: String,
    email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email.."]
    },
    website: {
        type: String,
        validate: [validator.isURL, "Please provide a valid website.."],
    },
    location: String,

    suppliers: [{ //
        name: String,
        constactNumber: String,
        id: {
            type: String,
            ref: "Supplier"
        },
    }],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }

}, {
    timestamps: true,
})



const Brand = mongoose.model("Brand", brandSchema)

module.exports = Brand;