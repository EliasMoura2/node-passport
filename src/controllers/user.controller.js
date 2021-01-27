const User = require('../models/User')
const passport = require('../config/passport');


module.exports = {
  getAllUsers: (req, res) => {
    
  },
  getUser: (req, res) => {

  },
  signUpGet: (req, res) => {
    const data = { title: 'Singup' }
    const errors = { message : '' }
    res.render('signup', { data, errors })
  },
  signUpPost: async (req, res) => {
    try {
      if(req.body.password !== req.body.confirm_pass){
        const data = { title: 'Singup' }
        const errors = { message: 'Las passwords no coinciden' }
        // view
        res.render('signup', { data, errors })
        return
      }
      const { username, email, password } = req.body
      const user = new User({
        username,
        email,
        password
      })
      user.password = user.encryptPassword(user.password);
      await user.save();
      // route
      res.redirect('login')
    } catch (error) {
      res.status(500).json({ message: error.message })
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
  },
  updateUserGet: (req, res) => {

  },
  updateUserPost: (req, res) => {

  },
  deleteUser: (req, res) => {

  }
}