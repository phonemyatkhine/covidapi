var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var diabetes = require("../models/diabetes.js");
var Checker = require("../defaultFunctions/TokenChecker");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await diabetes.find({});
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
var upload = new diabetes(req.body);
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
diabetes.remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}else{
try{
diabetes.updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}
res.redirect("http://localhost:3000/static/coviddashB/html/main.html");
});
router.get("/Pregnancies/:value/", async (req, res) => {
let Pregnancies = req.params.value;
try {
var upload = await diabetes.find({ Pregnancies : Pregnancies });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Glucose/:value/", async (req, res) => {
let Glucose = req.params.value;
try {
var upload = await diabetes.find({ Glucose : Glucose });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/BloodPressure/:value/", async (req, res) => {
let BloodPressure = req.params.value;
try {
var upload = await diabetes.find({ BloodPressure : BloodPressure });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/SkinThickness/:value/", async (req, res) => {
let SkinThickness = req.params.value;
try {
var upload = await diabetes.find({ SkinThickness : SkinThickness });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Insulin/:value/", async (req, res) => {
let Insulin = req.params.value;
try {
var upload = await diabetes.find({ Insulin : Insulin });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/BMI/:value/", async (req, res) => {
let BMI = req.params.value;
try {
var upload = await diabetes.find({ BMI : BMI });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/DiabetesPedigreeFunction/:value/", async (req, res) => {
let DiabetesPedigreeFunction = req.params.value;
try {
var upload = await diabetes.find({ DiabetesPedigreeFunction : DiabetesPedigreeFunction });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Age/:value/", async (req, res) => {
let Age = req.params.value;
try {
var upload = await diabetes.find({ Age : Age });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Outcome/:value/", async (req, res) => {
let Outcome = req.params.value;
try {
var upload = await diabetes.find({ Outcome : Outcome });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
