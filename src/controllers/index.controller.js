
module.exports = {
  showHome: (req, res) => {
    const data = { title: 'Passport.js' }
    // console.log(data)
    res.render('index', { data })
    // res.render('index')
  }
}