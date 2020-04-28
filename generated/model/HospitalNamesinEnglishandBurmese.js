const mongoose = require("mongoose");
const HospitalNamesinEnglishandBurmeseSchema = new mongoose.Schema({
_:{
type: String,
},
hospitalnameen:{
type: String,
},
hospitalname:{
type: String,
},
},{
collection: 'HospitalNamesinEnglishandBurmese'
});
module.exports = mongoose.model('HospitalNamesinEnglishandBurmese',HospitalNamesinEnglishandBurmeseSchema)