var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var RegionlevelQuarantineFacilities = require("../models/RegionlevelQuarantineFacilities.js");
var Checker = require("../defaultFunctions/TokenChecker");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await RegionlevelQuarantineFacilities.find({});
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
var upload = new RegionlevelQuarantineFacilities(req.body);
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
RegionlevelQuarantineFacilities.remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}else{
try{
RegionlevelQuarantineFacilities.updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}
res.redirect("http://localhost:3000/static/coviddashB/html/main.html");
});
router.get("/_/:value/", async (req, res) => {
let _ = req.params.value;
try {
var upload = await RegionlevelQuarantineFacilities.find({ _ : _ });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/StateRegion/:value/", async (req, res) => {
let StateRegion = req.params.value;
try {
var upload = await RegionlevelQuarantineFacilities.find({ StateRegion : StateRegion });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Nooffacilities/:value/", async (req, res) => {
let Nooffacilities = req.params.value;
try {
var upload = await RegionlevelQuarantineFacilities.find({ Nooffacilities : Nooffacilities });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Totalnoofquaranitinepeople/:value/", async (req, res) => {
let Totalnoofquaranitinepeople = req.params.value;
try {
var upload = await RegionlevelQuarantineFacilities.find({ Totalnoofquaranitinepeople : Totalnoofquaranitinepeople });
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
var upload = await RegionlevelQuarantineFacilities.find({ Date : Date });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Remark/:value/", async (req, res) => {
let Remark = req.params.value;
try {
var upload = await RegionlevelQuarantineFacilities.find({ Remark : Remark });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
