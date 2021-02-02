const { Router } = require('express')
const router = Router()
const userCtrl = require('../controllers/user.controller')
const { loggedIn } = require('../middleware/loggedIn')

router.get('/', userCtrl.getAllUsers)
router.get('/update/:id', userCtrl.getUpdateUser)
router.post('/update/:id', userCtrl.postUpdateUser)
router.get('/delete/:id', loggedIn, userCtrl.deleteUser)

module.exports = router