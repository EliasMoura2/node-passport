const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')

passport.use(new LocalStrategy({
  // usernameField: 'username',
  emailField: 'username',
  passwordField: 'password'
}, async function (email, password, done){
    await User.findOne({email: email}, (err, user) => {
      if(err) { return done(err) }
      if(!user) { return done(null, false, { message: 'Email incorrecto' }) }
      if(!user.validPassword(password)) { return done(null, false, { message: 'Password incorrecto' }) }
      return done(null, user)
    })
    // console.log(user)
  }
))

passport.serializeUser(function (user, done){
  done(null, user._id)
  // usa el id de mongo para hacer el matching entre la session y los datos del usuario
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function(err, user){
    done(err, user)
  })
})

// passport.use('local-signup', new LocalStrategy({
//   // usernameField: 'username',
//   emailField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true
// }, async (req, email, password, done) => {
//   const newUser = new User()
//   // newUser.username = username
//   newUser.email = email
//   newUser.password = newUser.encryptPassword(password)
//   console.log(newUser)
//   // const userStore = await user.save()
//   // console.log(userStore)
//   // await newUser.save()
//   // done(null, newUSer)
// }))

module.exports = passport