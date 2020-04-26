var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var MOHSDashboardData = require("../models/MOHSDashboardData.js");
var Checker = require("../defaultFunctions/TokenChecker");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await MOHSDashboardData.find({});
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
var upload = new MOHSDashboardData(req.body);
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
MOHSDashboardData.remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}else{
try{
MOHSDashboardData.updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}
res.redirect("http://localhost:3000/static/coviddashB/html/main.html");
});
router.get("/_/:value/", async (req, res) => {
let _ = req.params.value;
try {
var upload = await MOHSDashboardData.find({ _ : _ });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Unnamed0/:value/", async (req, res) => {
let Unnamed0 = req.params.value;
try {
var upload = await MOHSDashboardData.find({ Unnamed0 : Unnamed0 });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/No/:value/", async (req, res) => {
let No = req.params.value;
try {
var upload = await MOHSDashboardData.find({ No : No });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/SR/:value/", async (req, res) => {
let SR = req.params.value;
try {
var upload = await MOHSDashboardData.find({ SR : SR });
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
var upload = await MOHSDashboardData.find({ Township : Township });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Case/:value/", async (req, res) => {
let Case = req.params.value;
try {
var upload = await MOHSDashboardData.find({ Case : Case });
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
var upload = await MOHSDashboardData.find({ Tested : Tested });
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
var upload = await MOHSDashboardData.find({ PUI : PUI });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/M/:value/", async (req, res) => {
let M = req.params.value;
try {
var upload = await MOHSDashboardData.find({ M : M });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/F/:value/", async (req, res) => {
let F = req.params.value;
try {
var upload = await MOHSDashboardData.find({ F : F });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Child/:value/", async (req, res) => {
let Child = req.params.value;
try {
var upload = await MOHSDashboardData.find({ Child : Child });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Adult/:value/", async (req, res) => {
let Adult = req.params.value;
try {
var upload = await MOHSDashboardData.find({ Adult : Adult });
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
var upload = await MOHSDashboardData.find({ Confirmed : Confirmed });
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
var upload = await MOHSDashboardData.find({ Death : Death });
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
var upload = await MOHSDashboardData.find({ Recovered : Recovered });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Latitude/:value/", async (req, res) => {
let Latitude = req.params.value;
try {
var upload = await MOHSDashboardData.find({ Latitude : Latitude });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Longitude/:value/", async (req, res) => {
let Longitude = req.params.value;
try {
var upload = await MOHSDashboardData.find({ Longitude : Longitude });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/FID/:value/", async (req, res) => {
let FID = req.params.value;
try {
var upload = await MOHSDashboardData.find({ FID : FID });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
