const mongoose = require("mongoose");
const CommunityQuarantineFacilitiesLatestSchema = new mongoose.Schema({
_:{
type: String,
},
id:{
type: String,
},
SR_Pcode:{
type: String,
},
State_Region:{
type: String,
},
Tsp_Pcode:{
type: String,
},
Township:{
type: String,
},
Type:{
type: String,
},
Facility:{
type: String,
},
Date:{
type: String,
},
Admitted_Total:{
type: String,
},
},{
collection: 'CommunityQuarantineFacilitiesLatest'
});
module.exports = mongoose.model('CommunityQuarantineFacilitiesLatest',CommunityQuarantineFacilitiesLatestSchema)