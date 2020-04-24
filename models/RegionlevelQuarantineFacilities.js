const mongoose = require("mongoose");
const RegionlevelQuarantineFacilitiesSchema = new mongoose.Schema({
_:{
type: String,
},
StateRegion:{
type: String,
},
Nooffacilities:{
type: String,
},
Totalnoofquaranitinepeople:{
type: String,
},
Date:{
type: String,
},
Remark:{
type: String,
},
},{
collection: 'RegionlevelQuarantineFacilities'
});
module.exports = mongoose.model('RegionlevelQuarantineFacilities',RegionlevelQuarantineFacilitiesSchema)