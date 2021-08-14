const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name:String,
    id:String
})
module.exports = category = mongoose.model('category',categorySchema)