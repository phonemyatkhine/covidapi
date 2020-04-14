const mongoose = require("mongoose");
const Covid19BaselineTownshipDataSchema = new mongoose.Schema({
SR_PCODE:{
type: String,
},
SR_NAME:{
type: String,
},
SR_MM_NAME:{
type: String,
},
TS_PCODE:{
type: String,
},
TS_NAME:{
type: String,
},
TS_MM_NAME:{
type: String,
},
POP:{
type: String,
},
Under_5_POP:{
type: String,
},
Above_60_POP:{
type: String,
},
MEAN_HH_Size:{
type: String,
},
BED:{
type: String,
},
PHYSNB:{
type: String,
},
NURSNB:{
type: String,
},
HSNB:{
type: String,
},
},{
collection: 'Covid19BaselineTownshipData'
});
module.exports = mongoose.model('Covid19BaselineTownshipData',Covid19BaselineTownshipDataSchema)