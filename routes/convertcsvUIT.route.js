var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var convertcsvUIT = require("../models/convertcsvUIT.js");
var Checker = require("../defaultFunctions/TokenChecker");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await convertcsvUIT.find({});
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
var upload = new convertcsvUIT(req.body);
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
convertcsvUIT.remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}else{
try{
convertcsvUIT.updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}
res.redirect("http://localhost:3000/static/coviddashB/html/main.html");
});
router.get("/_/:value/", async (req, res) => {
let _ = req.params.value;
try {
var upload = await convertcsvUIT.find({ _ : _ });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/name/:value/", async (req, res) => {
let name = req.params.value;
try {
var upload = await convertcsvUIT.find({ name : name });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/phoneNumber/:value/", async (req, res) => {
let phoneNumber = req.params.value;
try {
var upload = await convertcsvUIT.find({ phoneNumber : phoneNumber });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/location/:value/", async (req, res) => {
let location = req.params.value;
try {
var upload = await convertcsvUIT.find({ location : location });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/stateDivision/:value/", async (req, res) => {
let stateDivision = req.params.value;
try {
var upload = await convertcsvUIT.find({ stateDivision : stateDivision });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/contactType/:value/", async (req, res) => {
let contactType = req.params.value;
try {
var upload = await convertcsvUIT.find({ contactType : contactType });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
