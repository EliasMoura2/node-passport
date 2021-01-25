const mongoose = require('mongoose');

mongoose.connection.on('open', () => console.log('DB is CONNECTED'))

async function connectDB({ host, port, dbname }){
  if(process.env.NODE_ENV === 'development'){
    const URI = `mongodb://${host}:${port}/${dbname}`
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } else if(process.env.NODE_ENV === 'production'){
    const URI = process.env.MONGODB_URI
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then((db) => console.log(`DB is Connected ${process.env.MONGODB_URI}`))
      .catch((err) => console.error(err))
  }
}

module.exports = connectDB