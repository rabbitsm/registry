import mongoose from 'mongoose'

var ItemSchema = new mongoose.Schema({
  ear: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  license: {
    type: String
  },
  author: {
    id: String,
    name: String,
    email: String,
    website: String
  },
  website: {
    type: String
  },
  docs: {
    type: String
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  scripts: {
    type: Map
  }
})

ItemSchema.statics.exists = function(ear, cb) {
  this.findOne({ear})
    .exec((err, item) => {
      if (err) throw err
      console.log(item)
      if (item === null){
        cb(false)
      } else {
        cb(true)
      }
    })
}

module.exports = mongoose.model('Item', ItemSchema)