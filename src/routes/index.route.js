const { Router } = require('express')
const router = Router()
const indexController = require('../controllers/index.controller')

router.get('/', indexController.Welcome)
router.get('/home', indexController.Home)

module.exports = router