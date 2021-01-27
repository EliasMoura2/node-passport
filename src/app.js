require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const passport = require('./config/passport');
const User = require('./models/User');
const verify = require('./middleware/loggedIn');

// Initializations
let store
// session and cookies
// if(process.env.NODE_ENV === 'production'){
//   // sessiones en memoria
  store = new session.MemoryStore
// } else {
//   store = new MongoDBStore({
//     uri: process.env.MONGODB_URI,
//     collection: 'sessions'
//   })
//   store.on('error', function(error){
//     assert.ifError(error)
//     assert.ok(false)
//   })
// }

const app = express()
app.use(session({
  cookie: { maxAge: 240 * 60 * 60 * 1000}, // 240 (10 dias) 60(1 horas) 60(1 min) 1000(1 seg)
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
// app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/', require('./routes/index.route'))
app.use('/users', require('./routes/user.router'))
app.use('/tasks', verify.loggedIn, require('./routes/tasks.router'))
// app.use('/session', require('./routes/exsession.route'))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

module.exports = app