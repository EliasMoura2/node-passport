const { Router } = require('express')
const router = Router()
const authCtrl = require('../controllers/auth.controller')
const { loggedIn } = require('../middleware/loggedIn')

router.get('/signup', authCtrl.signUpGet)
router.post('/signup', authCtrl.signUpPost)
router.get('/login', authCtrl.logInGet)
router.post('/login', authCtrl.logInPost)
router.get('/logout', loggedIn, authCtrl.logOut)

module.exports = router