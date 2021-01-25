const express = require('express')
const morgan = require('morgan')
const path = require('path');

const app = express()
// Settings
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Statics files
app.use('/public', express.static(`${path.join(__dirname, 'public')}`))

// Middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
app.use('/session', require('./routes/index.route'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app