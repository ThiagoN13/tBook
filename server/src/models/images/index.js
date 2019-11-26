'use strict'

const mongoose = require('mongoose')
const methods = require('./methods')
const statics = require('./statics')
const triggers = require('./triggers')
const Schema = mongoose.Schema

const CollecionName = 'images'

const { ObjectId } = Schema.Types

const schema = new Schema({
  name: {
    type: String,
    required: true
  },

  imageRef: {
    type: ObjectId,
    required: true
  }
}, {
  timestamps: true,
  collection: CollecionName
})

statics.register(schema)
triggers.register(schema)
methods.register(schema)

module.exports = mongoose.model(CollecionName, schema)
