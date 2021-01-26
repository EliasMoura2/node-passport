const User = require('../models/User')

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
      user.password = await user.encryptPassword(user.password);
      await user.save();
      // route
      res.redirect('signin')
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  signInGet: (req, res) => {
    const data = { title: 'Log in', message: 'Usuario creado' }
    res.render('signin', { data })
  },
  signInPost: async (req, res) => {
    try {
    // search user
    const user = await User.findOne({ email: req.body.email})
    if(!user){
      return res.status(400).json({ error: true, message: 'datos no valido'})
    } // don't exist email

    // validate password
    const password = req.body.password
    const validPassword = await user.comparePassword(password);
    if(!validPassword){
      return res.status(400).json({ auth: false, error: true, message: 'datos no valido'})
    } else {
      res.redirect('/home')
    }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateUserGet: (req, res) => {

  },
  updateUserPost: (req, res) => {

  },
  deleteUser: (req, res) => {

  }
}