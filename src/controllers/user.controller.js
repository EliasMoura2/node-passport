const User = require('../models/User')
const passport = require('../config/passport');


module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({})
      const data = { title: 'Users' }
      res.render('users/index', { users, data })
    } catch (error) {
      const data = { title: 'Error', message: error.message}
      res.render('error', { data })
      // res.status(500).json({
      //   message: error.message
      // })
    }
  },
  getUser: (req, res) => {

  },
  getUpdateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      const data = { title: 'Edit User' }
      res.render('users/edit', { user, data })
    } catch (error) {
      const data = { title: 'Error', message: error.message}
      res.render('error', { data })
      // res.status(500).json({
      //   message: error.message
      // })
    }
  },
  postUpdateUser: async (req, res) => {
    try {
      const { username, email } = req.body
      const update_values = { username, email }
      await User.findByIdAndUpdate(req.params.id, update_values)
      res.redirect('/users')
    } catch (error) {
      const data = { title: 'Error', message: error.message}
      res.render('error', { data })
      // res.status(500).json({
      //   message: error.message
      // })
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.redirect('/users')
    } catch (error) {
      const data = { title: 'Error', message: error.message}
      res.render('error', { data })
      // res.status(500).json({
      //   message: error.message
      // })
    }
  }
}