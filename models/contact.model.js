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
  contactType : {
    type:String, 
  },
  status: {
    type:String,
  },
  
}, {
  collection: 'contact'
});

module.exports = mongoose.model('contact', hospitalSchema )
