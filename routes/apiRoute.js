var axios = require('axios');
var express = require('express');
var router = express.Router();

var Getroutes = ['/contact/:state/:place',
              '/contact/:state/:place/:id'];
//route -> ( state:{yangon,mandalay,...},place:{hospitals,other org},id:{"id of hospital or org"})

var Postroutes = ['/contact/:state/:place'];

var Putroutes = ['/contact/:state/:place',
                 '/contact/:state/:place/:id'];

var Deleteroutes = [];

var GetrouteFunctions = [GetHospital,
                         GetOneHospital];

var PostrouteFunctions = [PostHospital];

var PutrouteFunctions = [PutHospital,
                         PutOneHospital]

router.use(function(req,res,next)
{
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});

router.get(Getroutes[0],GetrouteFunctions[0]);
router.get(Getroutes[1],GetrouteFunctions[1]);

router.post(Postroutes[0],PostrouteFunctions[0]);

router.put(Putroutes[0],PutrouteFunctions[0])
router.put(Putroutes[1],PutrouteFunctions[1])

function GetHospital(req,res,next)
{
    console.log("GetAllHospital");
    console.table(req.params)
    console.log(Getroutes[0]);
    res.json(req.params);
}

function GetOneHospital(req,res,next)
{
    console.log("GetOneHospital");
    console.table(req.params);
    console.log(Getroutes[1]);
    res.json(req.params);
}

function PostHospital(req,res,next)
{
    console.log("PostHospital");
    console.table(req.params);
    console.log(Postroutes[0]);
    res.json({returnStatus:1});
}

function PutHospital(req,res,next)
{
    console.log("PutHospital");
    console.table(req.params)
    console.log(Putroutes[0])
    res.json({returnStatus:1})
}

function PutOneHospital(req,res,next)
{
    console.log("PutOneHospital");
    console.table(req.params)
    console.log(Putroutes[1])
    res.json({returnStatus:1})
}

module.exports = router;