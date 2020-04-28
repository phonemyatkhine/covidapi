var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var HospitalNamesinEnglishandBurmese = require("../model/HospitalNamesinEnglishandBurmese.js");
var Checker = require("../../middlewares/checktoken.js");module.exports = router;
router.get("/", async (req, res) => {
try {
var upload = await HospitalNamesinEnglishandBurmese.find({});
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
var upload = new HospitalNamesinEnglishandBurmese(req.body);
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
res.status(200).json({ code: 200, status: "success" });
});
router.get("/_/:value/", async (req, res) => {
let _ = req.params.value;
try {
var upload = await HospitalNamesinEnglishandBurmese.find({ _ : _ });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/hospitalnameen/:value/", async (req, res) => {
let hospitalnameen = req.params.value;
try {
var upload = await HospitalNamesinEnglishandBurmese.find({ hospitalnameen : hospitalnameen });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
router.get("/hospitalname/:value/", async (req, res) => {
let hospitalname = req.params.value;
try {
var upload = await HospitalNamesinEnglishandBurmese.find({ hospitalname : hospitalname });
res.setHeader("Access-Control-Allow-Origin", "*");
res.json({ code: 201, data: upload });
} catch (err) {
res.status(500).json({
body: err.body
});
}
});
