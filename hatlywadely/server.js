const express = require('express');
var path = require("path");
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const multer=require('multer')
const cors=require('cors')
mongoose.Promise = global.Promise;
const app = express();
//app.use(express.static(path.join(__dirname,'uploads')))
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'dist/front')));
mongoose.connect(process.env.MONGODB_URI_LOCAL, {useNewUrlParser: true, useUnifiedTopology: true}).
catch(error => handleError(error));
;

app.use('/api/offers',require('./routes/offersRouter'));
app.use('/api/users',require('./routes/usersRouter'));
app.use('/api/products',require('./routes/productsRouter'));
app.use('/api/categories',require('./routes/categoryRouter'));




app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname,"/dist/front/index.html"));
});

app.listen(process.env.PORT||4000, () => {
	console.log(`Example app listening on port ${process.env.PORT||4000}!`);
});
