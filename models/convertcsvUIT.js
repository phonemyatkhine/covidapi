const mongoose = require("mongoose");
const convertcsvUITSchema = new mongoose.Schema({
_:{
type: String,
},
name:{
type: String,
},
phoneNumber:{
type: String,
},
location:{
type: String,
},
stateDivision:{
type: String,
},
contactType:{
type: String,
},
},{
collection: 'convertcsvUIT'
});
module.exports = mongoose.model('convertcsvUIT',convertcsvUITSchema)