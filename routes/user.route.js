const express = require('express');
const router = express.Router(); //express router to use the routing
const User = require('../models/user.model');

// Get all subscribers
router.get('/', async (req, res) => {

  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }

})

// Get one user
router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
})

// Create one user
router.post('/', async (req, res) => {
    try {
      const checkUser = await User.findOne({userId: req.body.userId})
      if(checkUser == null) {
        const user = new User({
          userId : req.body.userId,
          name : req.body.name,
          email : req.body.email,
          profile : req.body.profile,
          gender : req.body.gender,
          location : req.body.location,
        })
        try {
          const newUser = await user.save()
          res.status(201).json(newUser)
        } catch (err) {
          res.status(400).json({
            message: err.message
          })
        }
      } else {
        res.status(409).json({
          message : "User Already Exists"
        })
      }
    } catch (err) {
      res.status(400).json({
        message: err.message
      })
    }
    
})

// Update one user
router.patch('/:id', getUser, async (req, res) => {

  try {
    user.overwrite({
      userId : req.body.userId,
      name : req.body.name,
      email : req.body.email,
      profile : req.body.profile,
      gender : req.body.gender,
      location : req.body.location,
      picture : req.body.picture,
      ageRange :   req.body.ageRange,
    })
    try {
      await user.save()
      res.status(201).json(user)
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
router.delete('/:id', getUser, async (req, res) => {

  try {
    await res.user.remove()
    res.json({
      message: 'Deleted This user'
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }

})

async function getUser(req, res, next) {

  try {
    
    user = await User.findOne({userId: req.params.id})
    console.log(user)
    if (user == null) {
      return res.status(404).json({
        message: 'Cant find user'
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }

  res.user = user
  next()
}



module.exports = router; //exporting router
