module.exports = {
  loggedOut: (req, res, next) => {
    if(req.user){
      console.log('Usuario logeado')
      res.redirect('/home')
    } else {
      next()
    }
    // console.log(req.user)
  }
}