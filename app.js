require('dotenv').config() //dotenv library to use data from .env

var express = require('express');
var cons = require('consolidate');
var path = require('path');
var http = require('http');
var port = 3000;
var mongoose = require("mongoose"); //mongoose library for mongodb models

var app = express();
var port = 3000;

//connect mongoose to database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser  : true, useUnifiedTopology: true });
var db = mongoose.connection; //specify db is mongoose connection

//routes
var contact = require('./routes/contact.route')
var dummyData = require('./routes/dummy.route')
var views = require('./routes/view.route')

app.engine('html',cons.swig);

app.set('port',port)
app.set('view engine','html')
app.set('views',path.join(__dirname,'views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/contact',contact);
app.use('/dummy', dummyData);
app.use('/',views);

app.listen(port);
console.log('Starting.....');
console.log("http://localhost:"+port);

//open db which is mongoose connection 
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database connection successful...'));