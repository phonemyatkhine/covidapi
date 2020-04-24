const mongoose = require("mongoose");
const HospitalsSchema = new mongoose.Schema({
_:{
type: String,
},
SR_PCODE:{
type: String,
},
TS_PCODE:{
type: String,
},
region:{
type: String,
},
township:{
type: String,
},
hospital_name:{
type: String,
},
level:{
type: String,
},
bed:{
type: String,
},
lat:{
type: String,
},
long:{
type: String,
},
coordinates:{
type: String,
},
},{
collection: 'Hospitals'
});
module.exports = mongoose.model('Hospitals',HospitalsSchema)