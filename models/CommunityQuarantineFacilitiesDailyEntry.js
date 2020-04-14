const mongoose = require("mongoose");
const CommunityQuarantineFacilitiesDailyEntrySchema = new mongoose.Schema({
﻿SR_Pcode:{
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
collection: 'CommunityQuarantineFacilitiesDailyEntry'
});
module.exports = mongoose.model('CommunityQuarantineFacilitiesDailyEntry',CommunityQuarantineFacilitiesDailyEntrySchema)