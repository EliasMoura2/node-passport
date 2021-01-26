
module.exports = {
  getAllUsers: (req, res) => {
    
  },
  getUser: (req, res) => {

  },
  signUpGet: (req, res) => {
    const data = { title: 'Singup' }
    res.render('signup', { data })
  },
  signUpPost: async (req, res) => {
    // console.log(req.body)
    // res.send(req.body)
    try {
      const { username, email, password } = req.body
      const newUser = {
        username,
        email,
        password
      }
      console.log(newUser)
      res.redirect('signin')
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  signInGet: (req, res) => {
    const data = { title: 'Log in' }
    res.render('signin', { data })
  },
  updateUserGet: (req, res) => {

  },
  updateUserPost: (req, res) => {

  },
  deleteUser: (req, res) => {

  }
}