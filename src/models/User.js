const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: { type: String, required: [true, 'username is required'] },
  email: { type: String, required: [true, 'email is required'] },
  password: { type: String, required: [true, 'password is required']  }
}, {
  timestamps: true
})

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = model('User', userSchema)