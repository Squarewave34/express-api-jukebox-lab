const mongoose = require('mongoose')

const trackSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  artist:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Track', trackSchema)