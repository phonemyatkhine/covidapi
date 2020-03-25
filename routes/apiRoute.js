var axios = require('axios');
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data

var Getroutes = ['/contact/:state/:place',
              '/contact/:state/:place/:id'];
//route -> ( state:{yangon,mandalay,...},place:{hospitals,other org},id:{"id of hospital or org"})

var Postroutes = ['/contact/:state/:place'];

var Putroutes = ['/contact/:state/:place',
                 '/contact/:state/:place/:id'];

var Deleteroutes = [];

var GetrouteFunctions = [GetOneHospital,
                         GetOneIDHospital];

var PostrouteFunctions = [PostOneHospital];

var PutrouteFunctions = [PutOneHospital,
                         PutOneIDHospital]

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());
router.use(function(req,res,next)
{
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});

router.get(Getroutes[0],GetrouteFunctions[0]);
router.get(Getroutes[1],GetrouteFunctions[1]);

router.post(Postroutes[0],upload.array(),PostOneHospital[0]);

function GetOneHospital(req,res,next)
{
    console.log("GetAllHospital");
    console.table(req.params)
    console.log(routes[0]);
    res.json(req.params);
}

function GetOneIDHospital(req,res,next)
{
    console.log("GetOneHospital");
    console.table(req.params);
    console.log(routes[0]);
    res.json(req.params);
}

function PostOneHospital(req,res,next)
{
    console.log("PostOneHospital");
    console.table(req.params);
    res.json({returnStatus:1});
}

function PutOneHospital(req,res,next)
{
    console.log("PutOneHospital");
    console.table(req.params)
    res.json({returnStatus:1})
}

function PutOneIDHospital(req,res,next)
{
    console.log("PutOneIDHospital");
    console.table(req.params)
    res.json({returnStatus:1})
}

module.exports = router;