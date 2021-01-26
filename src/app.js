const express = require('express')
const morgan = require('morgan')
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

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
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SECRET_SESS,
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))
app.use(flash())

// Routes
app.use('/', require('./routes/index.route'))
app.use('/users', require('./routes/user.router'))
app.use('/session', require('./routes/exsession.route'))
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

module.exports = app