const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, required: [true, 'username is required'] },
  email: { type: String, required: [true, 'email is required'] },
  password: { type: String, required: [true, 'password is required']  }
}, {
  timestamps: true
})

module.exports = model('User', userSchema)