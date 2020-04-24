const mongoose = require("mongoose");
const FacilityNeedsSchema = new mongoose.Schema({
_:{
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
Facility:{
type: String,
},
Description:{
type: String,
},
Type:{
type: String,
},
Quantity_Required:{
type: String,
},
Quantity_Secured:{
type: String,
},
Quantity_Issued:{
type: String,
},
Quantity_In_Store:{
type: String,
},
Remark:{
type: String,
},
},{
collection: 'FacilityNeeds'
});
module.exports = mongoose.model('FacilityNeeds',FacilityNeedsSchema)