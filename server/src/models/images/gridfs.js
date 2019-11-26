const mongoose = require('mongoose')
const { createModel } = require('mongoose-gridfs')
const event = require('../../lib/event')

event.on('db.open', () => {
  // create custom bucket with custom options
  exports.Attachment = createModel({
    modelName: 'images',
    connection: mongoose.connection
  })
})
