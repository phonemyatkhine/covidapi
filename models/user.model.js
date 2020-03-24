const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  userId: {
    type:String,
  },
  name: {
    type:String,
  },
  email: {
    type:String,
  },
  profile: {
    type:String,
  },
  gender: {
    type:String,
  },
  location: {
    type:String,
  },
  picture: {
    type:String,
  },
  ageRange: {
    type:String,
  },
  
}, {
  collection: 'user'
});

module.exports = mongoose.model('user', userSchema )
