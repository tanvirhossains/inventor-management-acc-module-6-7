const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types

const storeSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "please provide a store name!! "],
        trim: true,
        maxLength: 100,
        lowercase: true,
        enum: {
            values: ["dhaka", "chittgong", "kulna", "sylhet", "barisal"],
            message: "{VALUE} is not a valid store name.."
        }
    },
    description: String,

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    manager: {
        name: String,
        contactNumber: String,
        id: {
            type: ObjectId,
            ref: "User",
        }
    },

}, {
    timestamps: true,
})



const Store = mongoose.model("Store", storeSchema)

exports = Store;