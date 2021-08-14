const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:String,
    desc:String,
    category:String,
    sellingNum:Number,
    rateNum:Number,
    photos:[{type:String}],
    productAmount:Number,
    price:Number,
    ProductCreator:String
})
module.exports = Product = mongoose.model('product',productSchema)