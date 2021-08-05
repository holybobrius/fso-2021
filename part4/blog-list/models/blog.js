const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLenght: 5,
    required: true
  },
  author: {
    type: String,
    minLenght: 5,
    required: true
  },
  url: {
    type: String,
    minLenght: 5,
    required: true
  },
  likes: {
    type: Number,
    minLenght: 5,
    default: 0
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

module.exports = mongoose.model('Blog', blogSchema)