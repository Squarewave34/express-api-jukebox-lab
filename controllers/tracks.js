const Track = require('../models/track')
const express = require('express')
const router = express.Router()

router.post('/', async(req, res)=>{
  try{

    const newTrack = await Track.create(req.body)
    res.status(201).json(newTrack)
    
  }catch(error){
    res.status(500).json({
      message: "error in creating a new track",
      error: error.message
    })
  }
})

router.get('/', async(req, res)=>{
  try{

    const allTracks = await Track.find()
    res.status(200).json(allTracks)

  }catch(error){
    res.status(500).json({
      message: "error in showing all tracks",
      error: error.message
    })
  }
})

router.get('/:trackId', async(req, res)=>{
  try{

    const oneTrack = await Track.findById(req.params.trackId)

    if(!oneTrack){
      res.status(404)
      throw new Error('no tracks with this id')
    }

    res.status(200).json(oneTrack)

  }catch(error){
    res.status(500).json({
      message: `couldn't show track with id ${req.params.trackId}`,
      error: error.message
    })
  }
})

router.put('/:trackId', async(req, res)=>{
  try{

    const updateTrack = await Track.findByIdAndUpdate(req.params.trackId, req.body, {new: true})

    if(!updateTrack){
      res.status(404)
      throw new Error("couldn't find track to update")
    }

    res.status(200).json(updateTrack)
  }catch(error){
    res.status(500).json({
      message: `error in updating track ${req.params.trackId}`,
      error: error.message
    })
  }
})

router.delete('/:trackId', async(req, res)=>{
  try{

    const deleteTrack = await Track.findByIdAndDelete(req.params.trackId)

    if(!deleteTrack){
      res.status(404)
      throw new Error("no track to delete")
    }

    res.status(200).json(deleteTrack)

  }catch(error){
    res.status(500).json({
      message: `couldn't delete track with id ${req.params.trackId}`,
      error: error.message
    })
  }
})

module.exports = router