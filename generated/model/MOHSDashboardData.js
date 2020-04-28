const mongoose = require("mongoose");
const MOHSDashboardDataSchema = new mongoose.Schema({
_:{
type: String,
},
Unnamed0:{
type: String,
},
No:{
type: String,
},
SR:{
type: String,
},
Township:{
type: String,
},
Case:{
type: String,
},
Tested:{
type: String,
},
PUI:{
type: String,
},
M:{
type: String,
},
F:{
type: String,
},
Child:{
type: String,
},
Adult:{
type: String,
},
Confirmed:{
type: String,
},
Death:{
type: String,
},
Recovered:{
type: String,
},
Latitude:{
type: String,
},
Longitude:{
type: String,
},
FID:{
type: String,
},
},{
collection: 'MOHSDashboardData'
});
module.exports = mongoose.model('MOHSDashboardData',MOHSDashboardDataSchema)