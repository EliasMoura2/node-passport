const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');

const saltRounds = 10

const userSchema = new Schema({
  username: { 
    type: String,
    trim: true,
    required: [true, 'username is required']
  },
  email: { 
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'email is required'],
  },
  password: { 
    type: String,
    trim: true,
    required: [true, 'password is required']
  },
  tasks: [{
    ref: "Task",
    type: Schema.Types.ObjectId
  }]
}, {
  timestamps:true,
  versionKey: false
})

userSchema.methods.encryptPassword = async (password) => {
  const saltRound = await bcrypt.genSalt(10)
  return bcrypt.hash(password, saltRound)
}

// funcion que se ejecuta antes de un save (hashea la password)
// userSchema.pre('save', function(next){
//   if(this.isModified('password')){
//     this.password = bcrypt.hashSync(this.password, saltRounds)
//   }
//   next()
// })

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = model('User', userSchema)