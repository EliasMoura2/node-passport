const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')


passport.serializeUser((user, done) => {
  done(null, user.id)
  // usa el id de mongo para hacer el matching entre la session y los datos del usuario
})

passport.deserializeUser( async(id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(new LocalStrategy(
  function (email, password, done){
    Usuario.findOne({email: email}, (err, user) => {
      if(err) return done(err)
      if(!user) return done(null, false, { message: `Email incorrecto` })
      if(!user.validPassword(password)) return done(null, false, { message : 'Password incorrecto' })
      return done(null, user)
    })
  }
))
// passport.use('local-signup', new LocalStrategy({
//   usernameField: 'username',
//   emailField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true
// }, async (req, username, email, password, done) => {
//   const user = new User()
//   user.username = username
//   user.email = email
//   user.password = password
//   const userStore = await user.save()
//   console.log(userStore)
//   done(null, userStore)
// }))
