const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    category: String,
    price: Number,
    description: String,
    location: String,
    contact: String
});

module.exports = mongoose.model("Product", productSchema);