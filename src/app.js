// require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// const flash = require('connect-flash');
const passport = require('./config/passport');
const verify = require('./middleware/loggedIn');
const { assert } = require('console')

require('./config/database')
// Initializations
// let store
// session and cookies
// if(process.env.NODE_ENV === 'development'){
//   // sessiones en memoria
//   store = new session.MemoryStore
// } else {
  let store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
  })

  store.on('error', function(error){
    // assert.ifError(error)
    // assert.ok(false)
    console.log(error)
  })
// }

const app = express()
app.use(session({
  secret: 'un secreto',
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7},
  store: store,
  resave: true,
  saveUninitialized: true,
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
app.use('/test', (req, res) => {
  res.send(`Hello ${JSON.stringify(req.session)}`)
})

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app