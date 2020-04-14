var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var CommunityQuarantineFacilitiesLatest = require("../models/CommunityQuarantineFacilitiesLatest.js");
var Checker = require("../defaultFunctions/TokenChecker");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await CommunityQuarantineFacilitiesLatest.find({});
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
var upload = new CommunityQuarantineFacilitiesLatest(req.body);
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
CommunityQuarantineFacilitiesLatest.remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}else{
try{
CommunityQuarantineFacilitiesLatest.updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}
res.redirect("http://localhost:3000/static/coviddashB/html/main.html");
});
router.get("/SR_Pcode/:value/", async (req, res) => {
let SR_Pcode = req.params.value;
try {
var upload = await CommunityQuarantineFacilitiesLatest.find({ SR_Pcode : SR_Pcode });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/State_Region/:value/", async (req, res) => {
let State_Region = req.params.value;
try {
var upload = await CommunityQuarantineFacilitiesLatest.find({ State_Region : State_Region });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Tsp_Pcode/:value/", async (req, res) => {
let Tsp_Pcode = req.params.value;
try {
var upload = await CommunityQuarantineFacilitiesLatest.find({ Tsp_Pcode : Tsp_Pcode });
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
var upload = await CommunityQuarantineFacilitiesLatest.find({ Township : Township });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Facility/:value/", async (req, res) => {
let Facility = req.params.value;
try {
var upload = await CommunityQuarantineFacilitiesLatest.find({ Facility : Facility });
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
var upload = await CommunityQuarantineFacilitiesLatest.find({ Date : Date });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Male/:value/", async (req, res) => {
let Male = req.params.value;
try {
var upload = await CommunityQuarantineFacilitiesLatest.find({ Male : Male });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Female/:value/", async (req, res) => {
let Female = req.params.value;
try {
var upload = await CommunityQuarantineFacilitiesLatest.find({ Female : Female });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Total/:value/", async (req, res) => {
let Total = req.params.value;
try {
var upload = await CommunityQuarantineFacilitiesLatest.find({ Total : Total });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
