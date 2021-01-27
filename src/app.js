require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const path = require('path');
const createError = require('http-errors')
const cookieParser = require('cookie-parser');
const session = require('express-session');
<<<<<<< HEAD
const MongoDBStore = require('connect-mongodb-session')(session);
// const flash = require('connect-flash');
=======
>>>>>>> 95e54bbc33c6f327d41bb9ec4d5482c79e72f03d
const passport = require('./config/passport');
const verify = require('./middleware/loggedIn');
const { assert } = require('console')

require('./config/database')
// Initializations
let store
// session and cookies
<<<<<<< HEAD
if(process.env.NODE_ENV === 'development'){
  // sessiones en memoria
  store = new session.MemoryStore
} else {
  store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
  })
  store.on('error', function(error){
    assert.ifError(error)
    assert.ok(false)
  })
}
=======
  store = new session.MemoryStore

>>>>>>> 95e54bbc33c6f327d41bb9ec4d5482c79e72f03d

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
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', require('./routes/index.route'))
app.use('/users', require('./routes/user.router'))
app.use('/tasks', verify.loggedIn, require('./routes/tasks.router'))

module.exports = app