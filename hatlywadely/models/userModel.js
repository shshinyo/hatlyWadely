const mongoose = require('mongoose');
const Product  = require('./productModel');
var bcrypt = require('bcrypt');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    name:String,
    username:String,
    email:String,
    address:String,
    phone:String,
    userType:String,
    password:String,
    token:String,
    profileImg:String,
    propertyDesc:String,
    confirmed:{type:Boolean,default:false},
    cart:[{ type: mongoose.Schema.Types.ObjectId, ref: Product}]
});
userSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

userSchema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}
module.exports = User = mongoose.model('user',userSchema)