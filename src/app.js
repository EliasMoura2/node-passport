require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const path = require('path');
const session = require('express-session');
const passport = require('./config/passport');
const verify = require('./middleware/loggedIn');

// Initializations
let store
// session and cookies
  store = new session.MemoryStore


const app = express()
app.use(session({
  cookie: { maxAge: 240 * 60 * 60 * 1000},
  store: store,
  resave: true,
  saveUninitialized: true,
  secret: `${process.env.SECRET_SESS}`,
  // cookie: { secure: true }
}))

// Settings
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Statics files
app.use('/public', express.static(`${path.join(__dirname, 'public')}`))

// Middleware
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// app.set('trust proxy', 1) // trust first proxy
// app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', require('./routes/index.route'))
app.use('/users', require('./routes/user.router'))
app.use('/tasks', verify.loggedIn, require('./routes/tasks.router'))

module.exports = app