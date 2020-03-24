const express = require('express')
const router = express.Router() //express router to use the routing
const fs = require('fs')
const stream = require('stream')

// Get all images
router.get('/', async (req, res) => {

  try {
    const image = await image.find().lean().limit(20);
    res.json(image);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }

})

// Get one image
router.get('/:id', (req, res) => {
    const r = fs.createReadStream('uploads/'+req.params.id) // or any other way to get a readable stream
    const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
    stream.pipeline(
     r,
     ps, // <---- this makes a trick with stream error handling
     (err) => {
      if (err) {
        console.log(err) // No such file or any other kind of error
        return res.sendStatus(400); 
      }
    })
    ps.pipe(res)
})

// Create one image
router.post('/', async (req, res) => {
  console.log(req.body);
  const image = new image({
    name : req.body.name,
    })
  try {
    const newimage = await image.save()
    res.status(201).json(newimage)
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }

})

// Update one image

async function getimage(req, res, next) {

  try {
    image = await image.findById(req.params.id)
    if (image == null) {
      return res.status(404).json({
        message: 'Cant find image'
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }

  res.image = image
  next()
}

module.exports = router; //exporting router
