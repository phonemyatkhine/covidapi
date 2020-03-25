var express = require('express');
var router = express.Router(); //express router to use the routing
var contact = require('../models/contact.model');

module.exports = router; //exporting router

// Get all subscribers
router.get('/:state/:type', async (req, res) => {
  
  
  var stateDivision = req.params.state
  var contactType = req.params.type
  try {
    const contact = await contact.find({state : stateDivision, contactType : contactType})
    res.json(contact);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }

})

// Get one contact
router.get('/:id', getContact, (req, res) => {
  res.json(res.contact)
})

// Create one contact
router.post('/', async (req, res) => {
    try {
      var checkcontact = await contact.findOne({name: req.body.name})
      if(checkcontact == null) {
        var contact = new contact({
          name : req.body.name,
          phoneNumber : req.body.phoneNumber,
          location : req.body.location,
          stateDivision : req.body.stateDivision,
          status : req.body.status,
        })
        try {
          var newcontact = await contact.save()
          res.status(201).json(newcontact)
        } catch (err) {
          res.status(400).json({
            message: err.message
          })
        }
      } else {
        res.status(409).json({
          message : "contact Already Exists"
        })
      }
    } catch (err) {
      res.status(400).json({
        message: err.message
      })
    }
    
})

// Update one contact
router.patch('/:id', getContact, async (req, res) => {

  try {
    contact.overwrite({
      contactId : req.body.contactId,
      name : req.body.name,
      email : req.body.email,
      profile : req.body.profile,
      gender : req.body.gender,
      location : req.body.location,
      picture : req.body.picture,
      ageRange :   req.body.ageRange,
    })
    try {
      await contact.save()
      res.status(201).json(contact)
    } catch (err) {
      res.status(400).json({
        message: err.message
      })
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

// Delete one subscriber
router.delete('/:id', getContact, async (req, res) => {

  try {
    await res.contact.remove()
    res.json({
      message: 'Deleted This contact'
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }

})

async function getContact(req, res, next) {

  try {
    
    contact = await contact.findOne({contactId: req.params.id})
    console.log(contact)
    if (contact == null) {
      return res.status(404).json({
        message: 'Cant find contact'
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }

  res.contact = contact
  next()
}



