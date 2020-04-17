var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var All = require("../models/All.js");
var Checker = require("../defaultFunctions/TokenChecker");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await All.find({});
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
var upload = new All(req.body);
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
All.remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}else{
try{
All.updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}
res.redirect("http://localhost:3000/static/coviddashB/html/main.html");
});
router.get("/Name/:value/", async (req, res) => {
let Name = req.params.value;
try {
var upload = await All.find({ Name : Name });
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
var upload = await All.find({ TypeofOrganisationorPerson : TypeofOrganisationorPerson });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/PhoneNumber/:value/", async (req, res) => {
let PhoneNumber = req.params.value;
try {
var upload = await All.find({ PhoneNumber : PhoneNumber });
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
var upload = await All.find({ Description : Description });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/BankAccount/:value/", async (req, res) => {
let BankAccount = req.params.value;
try {
var upload = await All.find({ BankAccount : BankAccount });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/AccountNumber/:value/", async (req, res) => {
let AccountNumber = req.params.value;
try {
var upload = await All.find({ AccountNumber : AccountNumber });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/MobileWallet/:value/", async (req, res) => {
let MobileWallet = req.params.value;
try {
var upload = await All.find({ MobileWallet : MobileWallet });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/MobileWalletAccountNumber/:value/", async (req, res) => {
let MobileWalletAccountNumber = req.params.value;
try {
var upload = await All.find({ MobileWalletAccountNumber : MobileWalletAccountNumber });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
