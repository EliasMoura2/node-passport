module.exports = {
  loggedIn: (req, res, next) => {
    if(req.user){
      next()
    }else{
      console.log('Usuario sin logearse')
      res.redirect('/auth/login')
    }
    // console.log(req.user)

  }
}