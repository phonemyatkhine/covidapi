var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var Covid19BaselineTownshipData = require("../model/Covid19BaselineTownshipData.js");
var Checker = require("../../middlewares/checktoken.js");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await Covid19BaselineTownshipData.find({});
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
var upload = new Covid19BaselineTownshipData(req.body);
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
Covid19BaselineTownshipData.remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}else{
try{
Covid19BaselineTownshipData.updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}
res.status(200).json({ code: 200, status: "success" });
});
router.get("/_/:value/", async (req, res) => {
let _ = req.params.value;
try {
var upload = await Covid19BaselineTownshipData.find({ _ : _ });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/SR_PCODE/:value/", async (req, res) => {
let SR_PCODE = req.params.value;
try {
var upload = await Covid19BaselineTownshipData.find({ SR_PCODE : SR_PCODE });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/SR_NAME/:value/", async (req, res) => {
let SR_NAME = req.params.value;
try {
var upload = await Covid19BaselineTownshipData.find({ SR_NAME : SR_NAME });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/SR_MM_NAME/:value/", async (req, res) => {
let SR_MM_NAME = req.params.value;
try {
var upload = await Covid19BaselineTownshipData.find({ SR_MM_NAME : SR_MM_NAME });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/TS_PCODE/:value/", async (req, res) => {
let TS_PCODE = req.params.value;
try {
var upload = await Covid19BaselineTownshipData.find({ TS_PCODE : TS_PCODE });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/TS_NAME/:value/", async (req, res) => {
let TS_NAME = req.params.value;
try {
var upload = await Covid19BaselineTownshipData.find({ TS_NAME : TS_NAME });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/TS_MM_NAME/:value/", async (req, res) => {
let TS_MM_NAME = req.params.value;
try {
var upload = await Covid19BaselineTownshipData.find({ TS_MM_NAME : TS_MM_NAME });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/POP/:value/", async (req, res) => {
let POP = req.params.value;
try {
var upload = await Covid19BaselineTownshipData.find({ POP : POP });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Under_5_POP/:value/", async (req, res) => {
let Under_5_POP = req.params.value;
try {
var upload = await Covid19BaselineTownshipData.find({ Under_5_POP : Under_5_POP });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Above_60_POP/:value/", async (req, res) => {
let Above_60_POP = req.params.value;
try {
var upload = await Covid19BaselineTownshipData.find({ Above_60_POP : Above_60_POP });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/MEAN_HH_Size/:value/", async (req, res) => {
let MEAN_HH_Size = req.params.value;
try {
var upload = await Covid19BaselineTownshipData.find({ MEAN_HH_Size : MEAN_HH_Size });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/BED/:value/", async (req, res) => {
let BED = req.params.value;
try {
var upload = await Covid19BaselineTownshipData.find({ BED : BED });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/PHYSNB/:value/", async (req, res) => {
let PHYSNB = req.params.value;
try {
var upload = await Covid19BaselineTownshipData.find({ PHYSNB : PHYSNB });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/NURSNB/:value/", async (req, res) => {
let NURSNB = req.params.value;
try {
var upload = await Covid19BaselineTownshipData.find({ NURSNB : NURSNB });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/HSNB/:value/", async (req, res) => {
let HSNB = req.params.value;
try {
var upload = await Covid19BaselineTownshipData.find({ HSNB : HSNB });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
