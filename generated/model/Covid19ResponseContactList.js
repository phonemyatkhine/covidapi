const mongoose = require("mongoose");
const Covid19ResponseContactListSchema = new mongoose.Schema({
_:{
type: String,
},
Sector:{
type: String,
},
State_Region:{
type: String,
},
SR_Pcode:{
type: String,
},
Township:{
type: String,
},
Tsp_Pcode:{
type: String,
},
Person:{
type: String,
},
Organization:{
type: String,
},
Description:{
type: String,
},
Contact_Primary:{
type: String,
},
Contact_Secondary:{
type: String,
},
Data_Submission_Time:{
type: String,
},
Field_ID:{
type: String,
},
},{
collection: 'Covid19ResponseContactList'
});
module.exports = mongoose.model('Covid19ResponseContactList',Covid19ResponseContactListSchema)