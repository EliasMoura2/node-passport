const { Router } = require('express');
const router = Router()
const taskController = require('../controllers/task.controller')

router.get('/', taskController.allTasks)
router.post('/create', taskController.addTask)
router.get('/turn/:id', taskController.doneTask)
router.get('/update/:id', taskController.getUpdateTask)
router.post('/update/:id', taskController.postUpdateTask)
router.get('/delete/:id', taskController.deleteTask)

module.exports = router