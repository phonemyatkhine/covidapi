const mongoose = require("mongoose");
const DevelopmentPartnersAssistanceSchema = new mongoose.Schema({
_:{
type: String,
},
OrganizationCountry:{
type: String,
},
Date:{
type: String,
},
Description:{
type: String,
},
Type:{
type: String,
},
Amount:{
type: String,
},
Remark:{
type: String,
},
Source:{
type: String,
},
},{
collection: 'DevelopmentPartnersAssistance'
});
module.exports = mongoose.model('DevelopmentPartnersAssistance',DevelopmentPartnersAssistanceSchema)