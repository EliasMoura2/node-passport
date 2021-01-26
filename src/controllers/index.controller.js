
module.exports = {
  Welcome: (req, res) => {
    const data = { title: 'Passport.js' }
    res.render('index', { data })
  },
  Home: (req, res) => {
    const data = { title: 'Home' }
    res.render('home', { data })
  }
}