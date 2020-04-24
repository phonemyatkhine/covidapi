var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var HospitalNamesinEnglishandBurmese = require("../models/HospitalNamesinEnglishandBurmese.js");
var Checker = require("../defaultFunctions/TokenChecker");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await HospitalNamesinEnglishandBurmese.find({});
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
var upload = new HospitalNamesinEnglishandBurmese(req.body);
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
HospitalNamesinEnglishandBurmese.remove({'_id':req.params.id},(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}else{
try{
HospitalNamesinEnglishandBurmese.updateOne({'_id':req.params.id},req.body,(err,result)=>{if(err){console.log(err);}});
} catch (e) {
console.log(e);
}
}
res.redirect("http://localhost:3000/static/coviddashB/html/main.html");
});
router.get("/_/:value/", async (req, res) => {
let _ = req.params.value;
try {
var upload = await HospitalNamesinEnglishandBurmese.find({ _ : _ });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/hospitalnameen/:value/", async (req, res) => {
let hospitalnameen = req.params.value;
try {
var upload = await HospitalNamesinEnglishandBurmese.find({ hospitalnameen : hospitalnameen });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
router.get("/hospitalname/:value/", async (req, res) => {
let hospitalname = req.params.value;
try {
var upload = await HospitalNamesinEnglishandBurmese.find({ hospitalname : hospitalname });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json(upload);
} catch (err) {
res.status(500).json({
message: err.message
});
}
});
