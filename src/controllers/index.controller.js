module.exports = {
  Welcome: (req, res) => {
    const data = { title: 'Passport.js' }
    res.render('index', { data })
  },
  Home: (req, res) => {
    
    // const user = req.flash('user')[0]
    // res.render('home', { data })
    const user = { username: req.user.username }
    const data = { title: 'Home' }
<<<<<<< HEAD
    // console.log(data)
    res.render('home', { data, user })
=======
    res.render('home', { data })
>>>>>>> 95e54bbc33c6f327d41bb9ec4d5482c79e72f03d
  }
}