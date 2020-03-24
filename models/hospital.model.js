const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({

  name: {
    type:String,
  },
  phoneNumber: {
    type:String,
  },
  location: {
    type:String,
  },
  stateDivision: {
    type:String,
  },
  status: {
    type:String,
  },
  
}, {
  collection: 'hospital'
});

module.exports = mongoose.model('hospital', hospitalSchema )
