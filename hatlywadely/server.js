const express = require('express');
const path = require("path");
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const multer=require('multer')
const cors=require('cors');
const passport = require('passport');
mongoose.Promise = global.Promise;
const app = express();
var session = require('express-session');
//app.use(express.static(path.join(__dirname,'uploads')))
app.use(cors({
	origin:['http://localhost:4200','http://127.0.0.1:4200'],
	credentials:true
  }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'dist/front')));
mongoose.connect(process.env.MONGODB_URI_LOCAL, {useNewUrlParser: true, useUnifiedTopology: true}).catch(error => handleError(error));;
//const MongoStore = require('connect-mongo')(session);
var db = mongoose.connection;
const MongoDbStore = require('connect-mongo');
app.use(session({
	name:'myname.sid',
	resave:false,
	saveUninitialized:false,
	secret:'secret',
	cookie:{
	  maxAge:36000000,
	  httpOnly:false,
	  secure:false
	},
	store: MongoDbStore.create({
		mongoUrl: process.env.MONGODB_URI_LOCAL
	})
 }));
require('./core/passport-config')
app.use(passport.initialize());
app.use(passport.session());





const swaggerUi = require("swagger-ui-express");
 require("./swagger.js");
const swaggerJsDoc= require("swagger-jsdoc");
const swaggerOptions = {
	swaggerDefinition: {
	  info: {
		version: "1.0.0",
		title: "products API",
		description: "products API Information",
		contact: {
		  name: "Amazing Developer"
		},
		servers: ["http://localhost:3100"]
	  }
	},
	// ['.routes/*.js']
	apis: [".routes/*.js","swagger.js"]
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs) );

 app.get("/customers", (req, res) => {
	res.status(200).send("Customer results");
  });
app.use('/api/offers',require('./routes/offersRouter'));
app.use('/api/users',require('./routes/usersRouter'));
app.use('/api/products',require('./routes/productsRouter'));
app.use('/api/categories',require('./routes/categoryRouter'));
require('./controllers/socketController');


app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname,"/dist/front/index.html"));
});

app.listen(process.env.PORT||4000, () => {
	console.log(`Example app listening on port ${process.env.PORT||4000}!`);
});
