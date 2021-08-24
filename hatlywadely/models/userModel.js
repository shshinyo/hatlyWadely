const mongoose = require('mongoose');
const Product  = require('./productModel');
var bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;
const userSchema = new mongoose.Schema({
    name:String,
    username:String,
    email:String,
    address:String,
    phone:String,
    userType:String,
    password:String,
    accessToken:String,
    profileImg:String,
    propertyDesc:String,
    confirmed:{type:Boolean,default:false},
    cart:[{ type: mongoose.Schema.Types.ObjectId, ref: Product}]
});
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
     
userSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

userSchema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}
module.exports = User = mongoose.model('user',userSchema);