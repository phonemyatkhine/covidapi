var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var DevelopmentPartnersAssistance = require("../model/DevelopmentPartnersAssistance.js");
var Checker = require("../../middlewares/checktoken.js");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await DevelopmentPartnersAssistance.find({});
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
var upload = new DevelopmentPartnersAssistance(req.body);
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
DevelopmentPartnersAssistance.remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}else{
try{
DevelopmentPartnersAssistance.updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}
res.status(200).json({ code: 200, status: "success" });
});
router.get("/_/:value/", async (req, res) => {
let _ = req.params.value;
try {
var upload = await DevelopmentPartnersAssistance.find({ _ : _ });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/OrganizationCountry/:value/", async (req, res) => {
let OrganizationCountry = req.params.value;
try {
var upload = await DevelopmentPartnersAssistance.find({ OrganizationCountry : OrganizationCountry });
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
var upload = await DevelopmentPartnersAssistance.find({ Date : Date });
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
var upload = await DevelopmentPartnersAssistance.find({ Description : Description });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Type/:value/", async (req, res) => {
let Type = req.params.value;
try {
var upload = await DevelopmentPartnersAssistance.find({ Type : Type });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Amount/:value/", async (req, res) => {
let Amount = req.params.value;
try {
var upload = await DevelopmentPartnersAssistance.find({ Amount : Amount });
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
var upload = await DevelopmentPartnersAssistance.find({ Remark : Remark });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Source/:value/", async (req, res) => {
let Source = req.params.value;
try {
var upload = await DevelopmentPartnersAssistance.find({ Source : Source });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
