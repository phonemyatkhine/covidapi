var express = require('express');
var router = express.Router(); //express router to use the routing
var Contact = require('../models/contact.model');

module.exports = router; //exporting router

// Get contacts from certain division and certain type
router.get('/list/:state/:type', async (req, res) => {
  
  let stateDivision = req.params.state
  let contactType = req.params.type
  try {
    var contact = await Contact.find({"stateDivision" : stateDivision, "contactType" : contactType})
    res.json(contact);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }

})

//Get contacts from certain division 
router.get('/list/:state/', async (req, res) => {
  
  let stateDivision = req.params.state
  try {
    var contact = await Contact.find({"stateDivision" : stateDivision})
    res.json(contact);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }

})

// Get one contact
router.get('/name/:name', getContact, (req, res) => {
  res.json(res.contact)
})

// Create one contact
router.post('/',getContact, async (req, res, next ) => {
    console.log(res.contact)
      if( contact == null) {
        var contact = new Contact({
          name : req.body.name,
          phoneNumber : req.body.phoneNumber,
          location : req.body.location,
          stateDivision : req.body.stateDivision,
          contactType : req.body.contactType,
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
          message : "Contact Already Exists"
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

//post dummy data
router.get('/fillDummyData', async (req, res) => {

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


//get contact
async function getContact(req, res, next) {

  if(req.params.name == null) {
    var name = req.body.name
  } else {
    var name = req.params.name
  }

  try {  
    contact = await Contact.findOne({"name": name})
    if (contact == null) {
      next()
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }

  res.contact = contact
  next()
}



