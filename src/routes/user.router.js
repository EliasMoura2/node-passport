const { Router } = require('express')
const router = Router()
const userController = require('../controllers/user.controller')

router.get('/', userController.getAllUsers)
router.get('/signup', userController.signUpGet)
router.post('/signup', userController.signUpPost)
router.get('/signin', userController.signInGet)
router.post('/signin', userController.signInPost)

module.exports = router