var express = require('express');
var cons = require('consolidate');
var path = require('path');
var http = require('http');

var app = express();
var port = 3000;

//routes
var apiRouter = require('./routes/apiRoute');
//testing because i dont know how to integrate into apiRouter but can use this as api too
var contactRoute = require('./routes/contact.route')


app.engine('html',cons.swig);

app.set('port',port)
app.set('view engine','html')
app.set('views',path.join(__dirname,'views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/api',apiRouter);
app.use('/contact',contactRoute);

app.listen(port);
console.log('starting');
console.log("http://localhost:"+port);