const Task = require('../models/Task')
const User = require('../models/User')

module.exports = {
  getTaskByUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.user.email }).populate('tasks')
      // console.log(user)
      // console.log(user.tasks)
      const data = { title: 'Tasks' }
      res.render('tasks/index', { tasks: user.tasks, data })
    } catch (error) {
      console.error(error)
    }
  },
  allTasks: async (req, res) => {
    try {
      const tasks = await Task.find({})
      // console.log(tasks)
      const data = { title: 'Tasks' }
      res.render('tasks/index', { tasks, data })
    } catch (error) {
      const data = { title: 'Error', message: error.message}
      res.render('error', { data })
      // res.status(500).json({
      //   message: error.message
      // })
    }
  },
  addTask: async (req, res) => {
    try {
      const { title, description } = req.body
      const newTask = new Task({ title, description })
      const task = await newTask.save()

      // console.log('task:', task)
      // console.log(task._id)
      // console.log(req.user)
      // console.log(req.user.id)

      const user = await User.findById(req.user.id)
      const tasks = user.tasks
      
      tasks.push(task._id)
      // console.log('tasks:', tasks)
      user.tasks = tasks
      // console.log(user)
      // console.log('user:', user)
      await user.save()
      res.redirect('/tasks/task')
    } catch (error) {
      const data = { title: 'Error', message: error.message}
      res.render('error', { data })
      // res.status(500).json({
      //   message: error.message
      // })
    }
  },
  doneTask: async(req, res) => {
    try {
      const task = await Task.findById(req.params.id)
      task.status = !task.status
      task.save()
      res.redirect('/tasks/task')
    } catch (error) {
      const data = { title: 'Error', message: error.message}
      res.render('error', { data })
      // res.status(500).json({
      //   message: error.message
      // })
    }
  },
  getUpdateTask: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id)
      const data = { title: 'Edit task'}
      res.render('tasks/edit', { task, data }) 
    } catch (error) {
      const data = { title: 'Error', message: error.message}
      res.render('error', { data })
      // res.status(500).json({
      //   message: error.message
      // })
    }
  },
  postUpdateTask: async (req, res) => {
    try {
      const { title, description, status } = req.body
      const update_values = { title, description, status }
      await Task.findByIdAndUpdate(req.params.id, update_values)
      res.redirect('/tasks')
    } catch (error) {
      const data = { title: 'Error', message: error.message}
      res.render('error', { data })
      // res.status(500).json({
      //   message: error.message
      // })
    }
  },
  deleteTask: async (req, res) => {
    try {
      const id = req.params.id
      await Task.findByIdAndDelete(id)
      const user = await User.findOne({ email: req.user.email })
      // console.log(user)
      // console.log(user.tasks)

      const newUserTasks = user.tasks.filter((taskId) => taskId != id)

      // console.log(newUserTasks)

      user.tasks = newUserTasks
      // console.log(user)
      await user.save()
      res.redirect('/tasks/task')
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  }
}


