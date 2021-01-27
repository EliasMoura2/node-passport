const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');

const saltRound = 10

const userSchema = new Schema({
  username: { type: String, required: [true, 'username is required'] },
  email: { type: String, required: [true, 'email is required'] },
  password: { type: String, required: [true, 'password is required']  }
}, {
  timestamps: true
})



userSchema.methods.encryptPassword = (password) => {
  // const salt = await bcrypt.genSalt(10)
  return bcrypt.hashSync(password, saltRound)
}

// // funcion que se ejecuta antes de un save (hashea la password)
// usuarioSchema.pre('save', function(next){
//   if(this.isModified('password')){
//     this.password = bcrypt.hashSync(this.password, saltRounds)
//   }
//   next()
// })

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = model('User', userSchema)