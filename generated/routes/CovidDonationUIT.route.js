var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var CovidDonationUIT = require("../model/CovidDonationUIT.js");
var Checker = require("../../middlewares/checktoken.js");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await CovidDonationUIT.find({});
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
var upload = new CovidDonationUIT(req.body);
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
CovidDonationUIT.remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}else{
try{
CovidDonationUIT.updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}
res.status(200).json({ code: 200, status: "success" });
});
router.get("/_/:value/", async (req, res) => {
let _ = req.params.value;
try {
var upload = await CovidDonationUIT.find({ _ : _ });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Name/:value/", async (req, res) => {
let Name = req.params.value;
try {
var upload = await CovidDonationUIT.find({ Name : Name });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/TypeofOrganisationorPerson/:value/", async (req, res) => {
let TypeofOrganisationorPerson = req.params.value;
try {
var upload = await CovidDonationUIT.find({ TypeofOrganisationorPerson : TypeofOrganisationorPerson });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/ContactPhoneNumber/:value/", async (req, res) => {
let ContactPhoneNumber = req.params.value;
try {
var upload = await CovidDonationUIT.find({ ContactPhoneNumber : ContactPhoneNumber });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/ContactPerson/:value/", async (req, res) => {
let ContactPerson = req.params.value;
try {
var upload = await CovidDonationUIT.find({ ContactPerson : ContactPerson });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Description/:value/", async (req, res) => {
let Description = req.params.value;
try {
var upload = await CovidDonationUIT.find({ Description : Description });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/MEB/:value/", async (req, res) => {
let MEB = req.params.value;
try {
var upload = await CovidDonationUIT.find({ MEB : MEB });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/KBZ/:value/", async (req, res) => {
let KBZ = req.params.value;
try {
var upload = await CovidDonationUIT.find({ KBZ : KBZ });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/AYA/:value/", async (req, res) => {
let AYA = req.params.value;
try {
var upload = await CovidDonationUIT.find({ AYA : AYA });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/CB/:value/", async (req, res) => {
let CB = req.params.value;
try {
var upload = await CovidDonationUIT.find({ CB : CB });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/KBZPay/:value/", async (req, res) => {
let KBZPay = req.params.value;
try {
var upload = await CovidDonationUIT.find({ KBZPay : KBZPay });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
