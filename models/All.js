const mongoose = require("mongoose");
const AllSchema = new mongoose.Schema({
Name:{
type: String,
},
TypeofOrganisationorPerson:{
type: String,
},
PhoneNumber:{
type: String,
},
Description:{
type: String,
},
BankAccount:{
type: String,
},
AccountNumber:{
type: String,
},
MobileWallet:{
type: String,
},
MobileWalletAccountNumber:{
type: String,
},
},{
collection: 'All'
});
module.exports = mongoose.model('All',AllSchema)