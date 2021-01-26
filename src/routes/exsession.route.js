const { Router } = require('express')
const router = Router()
const indexController = require('../controllers/exsession.controller');

router.get('/', indexController.getIndex)
router.post('/register', indexController.register)
router.get('/profile', indexController.profile)

module.exports = router