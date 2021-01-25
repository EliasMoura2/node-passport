
module.exports = {
  getIndex: (req, res, next) => {
    res.render('index')
  },
  registro: (req, res) => {
    console.log(req.body)
    // res.redirect('/')
    res.send(req.body)
  },
  profile: (req, res) => {
    console.log('asd')
    res.send('asda')
  }
}
