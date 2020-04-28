var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var Covid19ResponseContactList = require("../model/Covid19ResponseContactList.js");
var Checker = require("../../middlewares/checktoken.js");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await Covid19ResponseContactList.find({});
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
var upload = new Covid19ResponseContactList(req.body);
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
Covid19ResponseContactList.remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}else{
try{
Covid19ResponseContactList.updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}
res.status(200).json({ code: 200, status: "success" });
});
router.get("/_/:value/", async (req, res) => {
let _ = req.params.value;
try {
var upload = await Covid19ResponseContactList.find({ _ : _ });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Sector/:value/", async (req, res) => {
let Sector = req.params.value;
try {
var upload = await Covid19ResponseContactList.find({ Sector : Sector });
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
var upload = await Covid19ResponseContactList.find({ State_Region : State_Region });
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
var upload = await Covid19ResponseContactList.find({ SR_Pcode : SR_Pcode });
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
var upload = await Covid19ResponseContactList.find({ Township : Township });
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
var upload = await Covid19ResponseContactList.find({ Tsp_Pcode : Tsp_Pcode });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Person/:value/", async (req, res) => {
let Person = req.params.value;
try {
var upload = await Covid19ResponseContactList.find({ Person : Person });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Organization/:value/", async (req, res) => {
let Organization = req.params.value;
try {
var upload = await Covid19ResponseContactList.find({ Organization : Organization });
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
var upload = await Covid19ResponseContactList.find({ Description : Description });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Contact_Primary/:value/", async (req, res) => {
let Contact_Primary = req.params.value;
try {
var upload = await Covid19ResponseContactList.find({ Contact_Primary : Contact_Primary });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Contact_Secondary/:value/", async (req, res) => {
let Contact_Secondary = req.params.value;
try {
var upload = await Covid19ResponseContactList.find({ Contact_Secondary : Contact_Secondary });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Data_Submission_Time/:value/", async (req, res) => {
let Data_Submission_Time = req.params.value;
try {
var upload = await Covid19ResponseContactList.find({ Data_Submission_Time : Data_Submission_Time });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Field_ID/:value/", async (req, res) => {
let Field_ID = req.params.value;
try {
var upload = await Covid19ResponseContactList.find({ Field_ID : Field_ID });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
