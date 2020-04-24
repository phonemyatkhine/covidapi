var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var MedicalSupplieswithLocation = require("../models/MedicalSupplieswithLocation.js");
var Checker = require("../defaultFunctions/TokenChecker");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await MedicalSupplieswithLocation.find({});
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
var upload = new MedicalSupplieswithLocation(req.body);
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
MedicalSupplieswithLocation.remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}else{
try{
MedicalSupplieswithLocation.updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}
res.redirect("http://localhost:3000/static/coviddashB/html/main.html");
});
router.get("/_/:value/", async (req, res) => {
let _ = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ _ : _ });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/AnnouncementDate/:value/", async (req, res) => {
let AnnouncementDate = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ AnnouncementDate : AnnouncementDate });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Hospitaloriginal/:value/", async (req, res) => {
let Hospitaloriginal = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ Hospitaloriginal : Hospitaloriginal });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/hospitalnamemm/:value/", async (req, res) => {
let hospitalnamemm = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ hospitalnamemm : hospitalnamemm });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/PPE/:value/", async (req, res) => {
let PPE = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ PPE : PPE });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Glove/:value/", async (req, res) => {
let Glove = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ Glove : Glove });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/N95/:value/", async (req, res) => {
let N95 = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ N95 : N95 });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/SurgicalMask/:value/", async (req, res) => {
let SurgicalMask = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ SurgicalMask : SurgicalMask });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Goggle/:value/", async (req, res) => {
let Goggle = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ Goggle : Goggle });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/ShoeCover/:value/", async (req, res) => {
let ShoeCover = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ ShoeCover : ShoeCover });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/_16slidesCT/:value/", async (req, res) => {
let _16slidesCT = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ _16slidesCT : _16slidesCT });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/ICUBed/:value/", async (req, res) => {
let ICUBed = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ ICUBed : ICUBed });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/ECG/:value/", async (req, res) => {
let ECG = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ ECG : ECG });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/InfusionPump/:value/", async (req, res) => {
let InfusionPump = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ InfusionPump : InfusionPump });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/SyringePump/:value/", async (req, res) => {
let SyringePump = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ SyringePump : SyringePump });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Ventilators/:value/", async (req, res) => {
let Ventilators = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ Ventilators : Ventilators });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Remarks/:value/", async (req, res) => {
let Remarks = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ Remarks : Remarks });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/Ref/:value/", async (req, res) => {
let Ref = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ Ref : Ref });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/lat/:value/", async (req, res) => {
let lat = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ lat : lat });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/long/:value/", async (req, res) => {
let long = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ long : long });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
