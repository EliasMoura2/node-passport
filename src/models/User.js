const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');

// const saltRound = 10

const userSchema = new Schema({
  username: { type: String, required: [true, 'username is required'] },
  email: { type: String, required: [true, 'email is required'] },
  password: { type: String, required: [true, 'password is required']  }
}, {
  timestamps: true
})



userSchema.methods.encryptPassword = async (password) => {
  const saltRound = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, saltRound)
}

// // funcion que se ejecuta antes de un save (hashea la password)
// usuarioSchema.pre('save', function(next){
//   if(this.isModified('password')){
//     this.password = bcrypt.hashSync(this.password, saltRounds)
//   }
//   next()
// })

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = model('User', userSchema)