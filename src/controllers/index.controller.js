module.exports = {
  Welcome: (req, res) => {
    const data = { title: 'Passport.js' }
    // console.log(data)
    res.render('index', { data })
    // res.render('index')
  },
  Home: (req, res) => {
    
    // const user = req.flash('user')[0]
    // res.render('home', { data })
    const user = { username: req.user.username }
    const data = { title: 'Home' }
    // console.log(data)
    res.render('home', { data, user })
  }
}