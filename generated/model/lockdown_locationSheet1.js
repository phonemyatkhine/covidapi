const mongoose = require("mongoose");
const lockdown_locationSheet1Schema = new mongoose.Schema({
_:{
type: String,
},
Para_1:{
type: String,
},
Para_2:{
type: String,
},
Para_3:{
type: String,
},
Para_4:{
type: String,
},
TSPPcodemimu:{
type: String,
},
Para_5:{
type: String,
},
Para_6:{
type: String,
},
Para_7:{
type: String,
},
Para_8:{
type: String,
},
Para_9:{
type: String,
},
},{
collection: 'lockdown_locationSheet1'
});
module.exports = mongoose.model('lockdown_locationSheet1',lockdown_locationSheet1Schema)