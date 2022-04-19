const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: String,
        required: true,
    }
}, {
    versionKey: false,
})

const productModel = new model("productsCollection", productSchema);

module.exports = productModel;