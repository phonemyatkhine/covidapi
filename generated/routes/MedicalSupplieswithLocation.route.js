var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var MedicalSupplieswithLocation = require("../model/MedicalSupplieswithLocation.js");
var Checker = require("../../middlewares/checktoken.js");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await MedicalSupplieswithLocation.find({});
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
var upload = new MedicalSupplieswithLocation(req.body);
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
res.status(200).json({ code: 200, status: "success" });
});
router.get("/_/:value/", async (req, res) => {
let _ = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ _ : _ });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/AnnouncementDate/:value/", async (req, res) => {
let AnnouncementDate = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ AnnouncementDate : AnnouncementDate });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Hospitaloriginal/:value/", async (req, res) => {
let Hospitaloriginal = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ Hospitaloriginal : Hospitaloriginal });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/hospitalnamemm/:value/", async (req, res) => {
let hospitalnamemm = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ hospitalnamemm : hospitalnamemm });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/PPE/:value/", async (req, res) => {
let PPE = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ PPE : PPE });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Glove/:value/", async (req, res) => {
let Glove = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ Glove : Glove });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/N95/:value/", async (req, res) => {
let N95 = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ N95 : N95 });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/SurgicalMask/:value/", async (req, res) => {
let SurgicalMask = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ SurgicalMask : SurgicalMask });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Goggle/:value/", async (req, res) => {
let Goggle = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ Goggle : Goggle });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/ShoeCover/:value/", async (req, res) => {
let ShoeCover = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ ShoeCover : ShoeCover });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/_16slidesCT/:value/", async (req, res) => {
let _16slidesCT = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ _16slidesCT : _16slidesCT });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/ICUBed/:value/", async (req, res) => {
let ICUBed = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ ICUBed : ICUBed });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/ECG/:value/", async (req, res) => {
let ECG = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ ECG : ECG });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/InfusionPump/:value/", async (req, res) => {
let InfusionPump = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ InfusionPump : InfusionPump });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/SyringePump/:value/", async (req, res) => {
let SyringePump = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ SyringePump : SyringePump });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Ventilators/:value/", async (req, res) => {
let Ventilators = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ Ventilators : Ventilators });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Remarks/:value/", async (req, res) => {
let Remarks = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ Remarks : Remarks });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/Ref/:value/", async (req, res) => {
let Ref = req.params.value;
try {
var upload = await MedicalSupplieswithLocation.find({ Ref : Ref });
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
var upload = await MedicalSupplieswithLocation.find({ lat : lat });
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
var upload = await MedicalSupplieswithLocation.find({ long : long });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
