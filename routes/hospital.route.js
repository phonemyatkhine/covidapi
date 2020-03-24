var express = require('express');
var router = express.Router(); //express router to use the routing
var hospital = require('../models/hospital.model');

module.exports = router; //exporting router

// Get all subscribers
router.get('/:state/:object', async (req, res) => {
  var stateDivision = req.params.state
  var hospital = req.params.object
  
  try {
    const hospital = await hospital.find();
    res.json(hospital);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }

})

// Get one hospital
router.get('/:id', getHospital, (req, res) => {
  res.json(res.hospital)
})

// Create one hospital
router.post('/', async (req, res) => {
    try {
      var checkHospital = await hospital.findOne({name: req.body.name})
      if(checkHospital == null) {
        var hospital = new hospital({
          name : req.body.name,
          phoneNumber : req.body.phoneNumber,
          location : req.body.location,
          stateDivision : req.body.stateDivision,
          status : req.body.status,
        })
        try {
          var newHospital = await hospital.save()
          res.status(201).json(newHospital)
        } catch (err) {
          res.status(400).json({
            message: err.message
          })
        }
      } else {
        res.status(409).json({
          message : "Hospital Already Exists"
        })
      }
    } catch (err) {
      res.status(400).json({
        message: err.message
      })
    }
    
})

// Update one hospital
router.patch('/:id', getHospital, async (req, res) => {

  try {
    hospital.overwrite({
      hospitalId : req.body.hospitalId,
      name : req.body.name,
      email : req.body.email,
      profile : req.body.profile,
      gender : req.body.gender,
      location : req.body.location,
      picture : req.body.picture,
      ageRange :   req.body.ageRange,
    })
    try {
      await hospital.save()
      res.status(201).json(hospital)
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
router.delete('/:id', getHospital, async (req, res) => {

  try {
    await res.hospital.remove()
    res.json({
      message: 'Deleted This hospital'
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }

})

async function getHospital(req, res, next) {

  try {
    
    hospital = await hospital.findOne({hospitalId: req.params.id})
    console.log(hospital)
    if (hospital == null) {
      return res.status(404).json({
        message: 'Cant find hospital'
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }

  res.hospital = hospital
  next()
}



