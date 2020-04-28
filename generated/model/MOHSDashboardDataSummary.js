const mongoose = require("mongoose");
const MOHSDashboardDataSummarySchema = new mongoose.Schema({
_:{
type: String,
},
Date:{
type: String,
},
HosPt:{
type: String,
},
PUI:{
type: String,
},
Suspected:{
type: String,
},
Lab_Neg:{
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
Pending:{
type: String,
},
Tested:{
type: String,
},
},{
collection: 'MOHSDashboardDataSummary'
});
module.exports = mongoose.model('MOHSDashboardDataSummary',MOHSDashboardDataSummarySchema)