const mongoose = require("mongoose");
const CommunityQuarantineFacilitiesLatestSchema = new mongoose.Schema({
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
Facility:{
type: String,
},
Date:{
type: String,
},
Male:{
type: String,
},
Female:{
type: String,
},
Total:{
type: String,
},
},{
collection: 'CommunityQuarantineFacilitiesLatest'
});
module.exports = mongoose.model('CommunityQuarantineFacilitiesLatest',CommunityQuarantineFacilitiesLatestSchema)