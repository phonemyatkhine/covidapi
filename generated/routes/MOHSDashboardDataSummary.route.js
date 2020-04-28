var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var MOHSDashboardDataSummary = require("../model/MOHSDashboardDataSummary.js");
var Checker = require("../../middlewares/checktoken.js");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await MOHSDashboardDataSummary.find({});
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 200, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.post("/", Checker ,async (req, res) => {
try {
var upload = new MOHSDashboardDataSummary(req.body);
await upload.save();
res.status(201).json({ code: 201, status: "success" })
} catch (e) {
console.log(e);
res.status(500).json({ code: 500, error: "Something went wrong" });
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
res.status(200).json({ code: 200, status: "success" });
});
router.get("/_/:value/", async (req, res) => {
let _ = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ _ : _ });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Date/:value/", async (req, res) => {
let Date = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ Date : Date });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/HosPt/:value/", async (req, res) => {
let HosPt = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ HosPt : HosPt });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/PUI/:value/", async (req, res) => {
let PUI = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ PUI : PUI });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Suspected/:value/", async (req, res) => {
let Suspected = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ Suspected : Suspected });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Lab_Neg/:value/", async (req, res) => {
let Lab_Neg = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ Lab_Neg : Lab_Neg });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Confirmed/:value/", async (req, res) => {
let Confirmed = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ Confirmed : Confirmed });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Death/:value/", async (req, res) => {
let Death = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ Death : Death });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Recovered/:value/", async (req, res) => {
let Recovered = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ Recovered : Recovered });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Pending/:value/", async (req, res) => {
let Pending = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ Pending : Pending });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Tested/:value/", async (req, res) => {
let Tested = req.params.value;
try {
var upload = await MOHSDashboardDataSummary.find({ Tested : Tested });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
