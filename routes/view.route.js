const axios = require('axios');
var express = require('express');
var cons = require('consolidate');
var router = express.Router();

router.get('/',function(req,res,next)
{
    res.render('forminput');
});

router.get('/allservices',function(req,res,next)
{
    res.render('allservices');
});

module.exports = router;