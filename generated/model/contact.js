const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
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
collection: 'contact'
});
module.exports = mongoose.model('contact',contactSchema)