const { Router } = require('express')
const router = Router()
const indexController = require('../controllers/index.controller')
const verify = require('../middleware/loggedIn')

router.get('/', indexController.Welcome)
router.get('/home', verify.loggedIn, indexController.Home)

module.exports = router