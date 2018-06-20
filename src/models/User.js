import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  passwordSalt: {
    type: String,
    require: true,
  },
  maintainer: [
    {
      type: String
    }
  ]
})

const User = mongoose.model('User', UserSchema);

module.exports = User;