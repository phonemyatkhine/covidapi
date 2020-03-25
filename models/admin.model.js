const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({

  email: {
    type:String,
  },
  password: {
    type:String,
  },
}, {
  collection: 'admin'
});

module.exports = mongoose.model('admin', adminSchema )
