
module.exports = {
  getIndex: (req, res, next) => {
    res.render('index')
  },
  register: (req, res) => {
    // // Con express session
    // console.log(req.body)
    // req.session.user = req.body
    // req.session.user.name = 'Elias'
    // res.redirect('profile')

     // Con connect-flash
    console.log(req.body)
    const user = req.body
    user.name = 'Elias'
    req.flash('user', user)
    res.redirect('profile')
  },
  profile: (req, res) => {
    // // con express-session
    // // console.log(req.session.user)
    // // res.send(req.session.user )
    // const data = req.session.user
    // delete req.session.user
    // console.log(data)
    // // res.send(data)
    // res.render('profile', { data })

    // Con connect-flash
    const data = req.flash('user')[0]
    res.render('profile', { data })
  }
}
