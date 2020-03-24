var axios = require('axios');
var express = require('express');
var router = express.Router();
var routes = ['/contact/:state/:hospital',
              '/contact/:state/:hospital/:id'];

var routeFunctions = [AllHospital,
                      OneHospital];

router.use(function(req,res,next)
{
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});

router.get(routes[0],routeFunctions[0]);
router.get(routes[1],routeFunctions[1]);

function AllHospital(req,res,next)
{
    console.log("AllHospital");
    console.table(req.params)
    console.log(routes[0]);
    res.send(req.params);
}

function OneHospital(req,res,next)
{
    console.log("OneHospital");
    console.table(req.params)
    console.log(routes[0]);
    res.send(req.params);
}

module.exports = router;