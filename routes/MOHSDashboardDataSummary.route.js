var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var MOHSDashboardDataSummary = require("../models/MOHSDashboardDataSummary.js");
var Checker = require("../defaultFunctions/TokenChecker");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await MOHSDashboardDataSummary.find({});
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
var upload = new MOHSDashboardDataSummary(req.body);
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
MOHSDashboardDataSummary.remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}else{
try{
MOHSDashboardDataSummary.updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}
res.redirect("http://localhost:3000/static/coviddashB/html/main.html");
});
router.get("/_/:value/", async (req, res) => {
let _ = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ _ : _ });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Date/:value/", async (req, res) => {
let Date = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ Date : Date });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/HosPt/:value/", async (req, res) => {
let HosPt = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ HosPt : HosPt });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/PUI/:value/", async (req, res) => {
let PUI = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ PUI : PUI });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Suspected/:value/", async (req, res) => {
let Suspected = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ Suspected : Suspected });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Lab_Neg/:value/", async (req, res) => {
let Lab_Neg = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ Lab_Neg : Lab_Neg });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Confirmed/:value/", async (req, res) => {
let Confirmed = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ Confirmed : Confirmed });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Death/:value/", async (req, res) => {
let Death = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ Death : Death });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Recovered/:value/", async (req, res) => {
let Recovered = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ Recovered : Recovered });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Pending/:value/", async (req, res) => {
let Pending = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ Pending : Pending });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Tested/:value/", async (req, res) => {
let Tested = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ Tested : Tested });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
