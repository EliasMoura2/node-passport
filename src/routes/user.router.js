const { Router } = require('express')
const router = Router()
const userController = require('../controllers/user.controller')

router.get('/', userController.getAllUsers)
router.get('/signup', userController.signUpGet)
router.post('/signup', userController.signUpPost)
router.get('/login', userController.logInGet)
router.post('/login', userController.logInPost)
router.get('/logout', userController.logOut)

module.exports = router