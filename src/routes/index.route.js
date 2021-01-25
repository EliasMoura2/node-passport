const { Router } = require('express')
const router = Router()
const indexController = require('../controllers/index.controller');

router.get('/', indexController.getIndex)
router.post('/register', indexController.registro)
router.get('/profile', indexController.profile)

module.exports = router