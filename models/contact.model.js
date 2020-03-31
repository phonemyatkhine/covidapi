const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
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
  uploadBy: {
    type:String,
  },
  
}, {
  collection: 'contact'
});

module.exports = mongoose.model('contact', contactSchema )