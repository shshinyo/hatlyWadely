const mongoose = require('mongoose');
const Product  = require('./productModel');
const userSchema = new mongoose.Schema({
    name:String,
    address:String,
    phone:String,
    userType:String,
    password:String,
    token:String,
    profileImg:String,
    propertyDesc:String,
    cart:[{ type: mongoose.Schema.Types.ObjectId, ref: Product}]
})
module.exports = User = mongoose.model('user',userSchema)