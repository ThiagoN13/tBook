'use strict'

const config = require('../config')
const mongoose = require('mongoose')
const event = require('../lib/event')
mongoose.Promise = require('bluebird')

mongoose.connection.on('connected', () => {
  console.log('MongoDB is connected')
})

mongoose.connection.on('error', (err) => {
  console.log(`Could not connect to MongoDB because of ${err}`)
  process.exit(1)
})

if (config.env === 'dev') {
  mongoose.set('debug', true)
}

exports.connect = () => {
  const mongoURI = config.mongo.uri

  mongoose.connect(mongoURI, {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

  mongoose.set('useCreateIndex', true)

  const connection = mongoose.connection

  exports.connection = connection

  connection.on('open', () => {
    event.emit('db.open')
  })

  return mongoose.connection
}
