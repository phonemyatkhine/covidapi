var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var Hospitals = require("../models/Hospitals.js");
var Checker = require("../defaultFunctions/TokenChecker");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await Hospitals.find({});
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
var upload = new Hospitals(req.body);
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
Hospitals.remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}else{
try{
Hospitals.updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}
res.redirect("http://localhost:3000/static/coviddashB/html/main.html");
});
router.get("/_/:value/", async (req, res) => {
let _ = req.params.value;
try {
var upload = await Hospitals.find({ _ : _ });
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
var upload = await Hospitals.find({ SR_PCODE : SR_PCODE });
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
var upload = await Hospitals.find({ TS_PCODE : TS_PCODE });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/region/:value/", async (req, res) => {
let region = req.params.value;
try {
var upload = await Hospitals.find({ region : region });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/township/:value/", async (req, res) => {
let township = req.params.value;
try {
var upload = await Hospitals.find({ township : township });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/hospital_name/:value/", async (req, res) => {
let hospital_name = req.params.value;
try {
var upload = await Hospitals.find({ hospital_name : hospital_name });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/level/:value/", async (req, res) => {
let level = req.params.value;
try {
var upload = await Hospitals.find({ level : level });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/bed/:value/", async (req, res) => {
let bed = req.params.value;
try {
var upload = await Hospitals.find({ bed : bed });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/lat/:value/", async (req, res) => {
let lat = req.params.value;
try {
var upload = await Hospitals.find({ lat : lat });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/long/:value/", async (req, res) => {
let long = req.params.value;
try {
var upload = await Hospitals.find({ long : long });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/coordinates/:value/", async (req, res) => {
let coordinates = req.params.value;
try {
var upload = await Hospitals.find({ coordinates : coordinates });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
