const mongoose = require("mongoose");
const V2Schema = new mongoose.Schema({
Name:{
type: String,
},
TypeofOrganisationorPerson:{
type: String,
},
ContactPhoneNumber:{
type: String,
},
Description:{
type: String,
},
MEB:{
type: String,
},
KBZ:{
type: String,
},
AYA:{
type: String,
},
CB:{
type: String,
},
KBZPay:{
type: String,
},
},{
collection: 'V2'
});
module.exports = mongoose.model('V2',V2Schema)