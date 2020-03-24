var axios = require('axios');
var express = require('express');
var router = express.Router();
var routes = ['/contact',
             ];

var routeFunctions = [AllHospital
                     ];

router.use(function(req,res,next)
{
    console.log('%s %s %s', req.method, req.url, req.path);
});

router.get(routes[0],routeFunctions[0]);

function AllHospital(req,res,next)
{
    console.log("work");
    
    console.log(routes[0]);
}

module.exports = router;