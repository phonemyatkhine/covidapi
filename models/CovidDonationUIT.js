const mongoose = require("mongoose");
const CovidDonationUITSchema = new mongoose.Schema({
_:{
type: String,
},
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
collection: 'CovidDonationUIT'
});
module.exports = mongoose.model('CovidDonationUIT',CovidDonationUITSchema)