var express = require('express');
var router = express.Router(); //express router to use the routing
var Contact = require('../models/contact.model');

module.exports = router; //exporting router

// Get contacts from certain division and certain type
router.get('/', async (req, res) => {
  
  try {
    var contact = new Contact({
        name : "Yangon Pyi Thu Say Yone Gyi",
        phoneNumber : "01256123",
        location : "-",
        stateDivision : "YGN",
        contactType : "hospital",
      })
      try {
        await contact.save()
      } catch (err) {
        res.status(400).json({
          message: err.message
        })
      }

    var contact = new Contact({
        name : "Mandalay Kalay Say Yone Gyi",
        phoneNumber : "02345068",
        location : "-",
        stateDivision : "MDY",
        contactType : "hospital",
      })
      try {
        await contact.save()
      } catch (err) {
        res.status(400).json({
          message: err.message
        })
      }

    var contact = new Contact({
        name : "Nar Yay Ku Nyi Mhu",
        phoneNumber : "01256123",
        location : "-",
        stateDivision : "YGN",
        contactType : "social services",
      })
      try {
        await contact.save()
      } catch (err) {
        res.status(400).json({
          message: err.message
        })
      }
    var contact = new Contact({
        name : "Mandalay Volunteers",
        phoneNumber : "01256123",
        location : "-",
        stateDivision : "MDY",
        contactType : "social services",
      })
      try {
        await contact.save()
      } catch (err) {
        res.status(400).json({
          message: err.message
        })
      }
      res.json({
          message : "Dummy Created"
      })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }

})
