const mongoose = require("mongoose");
const MedicalSupplieswithLocationSchema = new mongoose.Schema({
_:{
type: String,
},
AnnouncementDate:{
type: String,
},
Hospitaloriginal:{
type: String,
},
hospitalnamemm:{
type: String,
},
PPE:{
type: String,
},
Glove:{
type: String,
},
N95:{
type: String,
},
SurgicalMask:{
type: String,
},
Goggle:{
type: String,
},
ShoeCover:{
type: String,
},
_16slidesCT:{
type: String,
},
ICUBed:{
type: String,
},
ECG:{
type: String,
},
InfusionPump:{
type: String,
},
SyringePump:{
type: String,
},
Ventilators:{
type: String,
},
Remarks:{
type: String,
},
Ref:{
type: String,
},
lat:{
type: String,
},
long:{
type: String,
},
},{
collection: 'MedicalSupplieswithLocation'
});
module.exports = mongoose.model('MedicalSupplieswithLocation',MedicalSupplieswithLocationSchema)