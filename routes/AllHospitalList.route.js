var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var AllHospitalList = require("../models/AllHospitalList.js");
var Checker = require("../defaultFunctions/TokenChecker");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await AllHospitalList.find({});
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.post("/", Checker ,async (req, res) => {
try {
var upload = new AllHospitalList(req.body);
await upload.save();
res.redirect("http://localhost:3000/static/coviddashB/html/main.html");
} catch (e) {
console.log(e);
res.redirect("http://localhost:3000/static/coviddashB/html/main.html");
}
});
router.post("/:id", Checker , async (req,res) => {
if(Object.keys(req.body).length === 0){
try{
AllHospitalList.remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}else{
try{
AllHospitalList.updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}
res.redirect("http://localhost:3000/static/coviddashB/html/main.html");
});
router.get("/Region/:value/", async (req, res) => {
let Region = req.params.value;
try {
var upload = await AllHospitalList.find({ Region : Region });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Township/:value/", async (req, res) => {
let Township = req.params.value;
try {
var upload = await AllHospitalList.find({ Township : Township });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/HospitalName/:value/", async (req, res) => {
let HospitalName = req.params.value;
try {
var upload = await AllHospitalList.find({ HospitalName : HospitalName });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Bed/:value/", async (req, res) => {
let Bed = req.params.value;
try {
var upload = await AllHospitalList.find({ Bed : Bed });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Latitude/:value/", async (req, res) => {
let Latitude = req.params.value;
try {
var upload = await AllHospitalList.find({ Latitude : Latitude });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Longitude/:value/", async (req, res) => {
let Longitude = req.params.value;
try {
var upload = await AllHospitalList.find({ Longitude : Longitude });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Coordinates/:value/", async (req, res) => {
let Coordinates = req.params.value;
try {
var upload = await AllHospitalList.find({ Coordinates : Coordinates });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
