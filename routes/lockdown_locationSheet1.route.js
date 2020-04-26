var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var lockdown_locationSheet1 = require("../models/lockdown_locationSheet1.js");
var Checker = require("../defaultFunctions/TokenChecker");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await lockdown_locationSheet1.find({});
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
var upload = new lockdown_locationSheet1(req.body);
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
lockdown_locationSheet1.remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}else{
try{
lockdown_locationSheet1.updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}
res.redirect("http://localhost:3000/static/coviddashB/html/main.html");
});
router.get("/_/:value/", async (req, res) => {
let _ = req.params.value;
try {
var upload = await lockdown_locationSheet1.find({ _ : _ });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Para_1/:value/", async (req, res) => {
let Para_1 = req.params.value;
try {
var upload = await lockdown_locationSheet1.find({ Para_1 : Para_1 });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Para_2/:value/", async (req, res) => {
let Para_2 = req.params.value;
try {
var upload = await lockdown_locationSheet1.find({ Para_2 : Para_2 });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Para_3/:value/", async (req, res) => {
let Para_3 = req.params.value;
try {
var upload = await lockdown_locationSheet1.find({ Para_3 : Para_3 });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Para_4/:value/", async (req, res) => {
let Para_4 = req.params.value;
try {
var upload = await lockdown_locationSheet1.find({ Para_4 : Para_4 });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/TSPPcodemimu/:value/", async (req, res) => {
let TSPPcodemimu = req.params.value;
try {
var upload = await lockdown_locationSheet1.find({ TSPPcodemimu : TSPPcodemimu });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Para_5/:value/", async (req, res) => {
let Para_5 = req.params.value;
try {
var upload = await lockdown_locationSheet1.find({ Para_5 : Para_5 });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Para_6/:value/", async (req, res) => {
let Para_6 = req.params.value;
try {
var upload = await lockdown_locationSheet1.find({ Para_6 : Para_6 });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Para_7/:value/", async (req, res) => {
let Para_7 = req.params.value;
try {
var upload = await lockdown_locationSheet1.find({ Para_7 : Para_7 });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Para_8/:value/", async (req, res) => {
let Para_8 = req.params.value;
try {
var upload = await lockdown_locationSheet1.find({ Para_8 : Para_8 });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Para_9/:value/", async (req, res) => {
let Para_9 = req.params.value;
try {
var upload = await lockdown_locationSheet1.find({ Para_9 : Para_9 });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
