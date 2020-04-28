var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var CommunityQuarantineFacilitiesDailyEntry = require("../model/CommunityQuarantineFacilitiesDailyEntry.js");
var Checker = require("../../middlewares/checktoken.js");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await CommunityQuarantineFacilitiesDailyEntry.find({});
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
var upload = new CommunityQuarantineFacilitiesDailyEntry(req.body);
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
CommunityQuarantineFacilitiesDailyEntry.remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}else{
try{
CommunityQuarantineFacilitiesDailyEntry.updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}
res.status(200).json({ code: 200, status: "success" });
});
router.get("/_/:value/", async (req, res) => {
let _ = req.params.value;
try {
var upload = await CommunityQuarantineFacilitiesDailyEntry.find({ _ : _ });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/SR_Pcode/:value/", async (req, res) => {
let SR_Pcode = req.params.value;
try {
var upload = await CommunityQuarantineFacilitiesDailyEntry.find({ SR_Pcode : SR_Pcode });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/State_Region/:value/", async (req, res) => {
let State_Region = req.params.value;
try {
var upload = await CommunityQuarantineFacilitiesDailyEntry.find({ State_Region : State_Region });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Tsp_Pcode/:value/", async (req, res) => {
let Tsp_Pcode = req.params.value;
try {
var upload = await CommunityQuarantineFacilitiesDailyEntry.find({ Tsp_Pcode : Tsp_Pcode });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Township/:value/", async (req, res) => {
let Township = req.params.value;
try {
var upload = await CommunityQuarantineFacilitiesDailyEntry.find({ Township : Township });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Facility/:value/", async (req, res) => {
let Facility = req.params.value;
try {
var upload = await CommunityQuarantineFacilitiesDailyEntry.find({ Facility : Facility });
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
var upload = await CommunityQuarantineFacilitiesDailyEntry.find({ Date : Date });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Male/:value/", async (req, res) => {
let Male = req.params.value;
try {
var upload = await CommunityQuarantineFacilitiesDailyEntry.find({ Male : Male });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Female/:value/", async (req, res) => {
let Female = req.params.value;
try {
var upload = await CommunityQuarantineFacilitiesDailyEntry.find({ Female : Female });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Total/:value/", async (req, res) => {
let Total = req.params.value;
try {
var upload = await CommunityQuarantineFacilitiesDailyEntry.find({ Total : Total });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
