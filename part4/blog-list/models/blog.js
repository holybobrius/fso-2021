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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: {
    type: Array,
    default: []
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)