const mongoose = require("mongoose");
const ForeignReturneesSchema = new mongoose.Schema({
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
Country:{
type: String,
},
Returnees:{
type: String,
},
},{
collection: 'ForeignReturnees'
});
module.exports = mongoose.model('ForeignReturnees',ForeignReturneesSchema)