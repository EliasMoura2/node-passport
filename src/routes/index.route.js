const { Router } = require('express')
const router = Router()
const indexController = require('../controllers/index.controller')
const verify = require('../middleware/loggedIn')
const verifyOut = require('../middleware/logedOut')

router.get('/', verifyOut.loggedOut, indexController.Welcome)
router.get('/home', verify.loggedIn, indexController.Home)

module.exports = router