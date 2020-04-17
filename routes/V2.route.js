var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var V2 = require("../models/V2.js");
var Checker = require("../defaultFunctions/TokenChecker");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await V2.find({});
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
var upload = new V2(req.body);
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
V2.remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}else{
try{
V2.updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}
res.redirect("http://localhost:3000/static/coviddashB/html/main.html");
});
router.get("/Name/:value/", async (req, res) => {
let Name = req.params.value;
try {
var upload = await V2.find({ Name : Name });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/TypeofOrganisationorPerson/:value/", async (req, res) => {
let TypeofOrganisationorPerson = req.params.value;
try {
var upload = await V2.find({ TypeofOrganisationorPerson : TypeofOrganisationorPerson });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/ContactPhoneNumber/:value/", async (req, res) => {
let ContactPhoneNumber = req.params.value;
try {
var upload = await V2.find({ ContactPhoneNumber : ContactPhoneNumber });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Description/:value/", async (req, res) => {
let Description = req.params.value;
try {
var upload = await V2.find({ Description : Description });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/MEB/:value/", async (req, res) => {
let MEB = req.params.value;
try {
var upload = await V2.find({ MEB : MEB });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/KBZ/:value/", async (req, res) => {
let KBZ = req.params.value;
try {
var upload = await V2.find({ KBZ : KBZ });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/AYA/:value/", async (req, res) => {
let AYA = req.params.value;
try {
var upload = await V2.find({ AYA : AYA });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/CB/:value/", async (req, res) => {
let CB = req.params.value;
try {
var upload = await V2.find({ CB : CB });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/KBZPay/:value/", async (req, res) => {
let KBZPay = req.params.value;
try {
var upload = await V2.find({ KBZPay : KBZPay });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
