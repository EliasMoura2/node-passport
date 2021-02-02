const User = require('../models/User')
const passport = require('../config/passport');

module.exports = {
  signUpGet: (req, res) => {
    // const data = { title: 'Singup' }
    // const errors = { message : '' }
    res.render('signup', { 
      title: 'Sign up',
      message: {}, 
      user: new User()
    })
  },
  signUpPost: async (req, res) => {
    try {
      // if(req.body.password !== req.body.confirm_pass){
      //   // const data = { title: 'Singup' }
      //   // const errors = { confirm: 'Las passwords no coinciden' }
      //   // console.log('Error contraseña')
      //   // console.log(errors.confirm)
      //   // throw 
      //   // // view
      //   // error.errors.confirm = { message: 'Password do not match'}
      //   // console.log('asdasd', error.errors.confirm)
      //   console.log('asdas')
      //   const data = { message: '' }
      //   res.render('signup', data )
      //   // throw (new Error('Passwords do not match'))
      // }
      const { username, email, password } = req.body
      console.log('req.body: ',req.body)
      const user = new User({
        username,
        email,
        password
      })
      console.log('User: ', user)
      // user.password = await user.encryptPassword(user.password);
      const userStored =  await user.save();
      // await user.save()
      console.log('userStored: ', userStored)
      // route
      res.redirect('login')
    } catch (error) {
      // const data = { title: 'Error', message: error.message}
      // res.render('error', { data })
      // res.status(500).json({
      //   message: error.message
      // })
      // console.log('throw', error.message)
      console.log('Errores:', error.errors)
      // const data = { title: 'Singup' }
      const errors = error.errors
      // view
      res.render('signup', { errors })
    }
  },
  logInGet: (req, res) => {
    const data = { title: 'Log in'}
    // res.render('signin', { errors: {}, user: new User()})
    res.render('login', { data })
  },
  logInPost: (req, res, next) => {
    passport.authenticate('local', function(err, user, info){
      if(err) return next(err)
      if(!user) {
        const data = { title: 'Log in'}
        return res.render('login', {data, info})
      }
  
      req.logIn(user, function(err){
        if(err) return next(err)
        return res.redirect('/home')
      })
    })(req, res, next) // lo pasamos, evaluamos con req, res ,next
  },
  logOut: (req, res) =>{
    req.logOut()
    res.redirect('/')
  }
}