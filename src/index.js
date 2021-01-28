if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const app = require('./app')

app.set('port', process.env.PORT || 3000)

const port = app.get('port')

app.listen(port, () => {
  console.log(`Server running on port = ${port}`)
})
// const { appConfig, dbConfig } = require('./config/config')
// const connectDB = require('./config/database')

// app.set('port', appConfig.port || 5000)

// async function initApp(appConfig, dbConfig){
//   try {
//     await connectDB(dbConfig)
//     const port = app.get('port')
//     app.listen(port, () => {
//       console.log(`Server listening or port = ${port}`)
//     })
//   } catch (error) {
//     console.error(error)
//     process.exit(0)
//   }
// }

// initApp(appConfig, dbConfig)

