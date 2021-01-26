
module.exports = {
  Welcome: (req, res) => {
    const data = { title: 'Passport.js' }
    // console.log(data)
    res.render('index', { data })
    // res.render('index')
  },
  Home: (req, res) => {
    const data = { title: 'Home' }
    // console.log(data)
    res.render('home', { data })
  }
}