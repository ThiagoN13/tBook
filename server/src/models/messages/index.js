'use strict'

const mongoose = require('mongoose')
const methods = require('./methods')
const triggers = require('./triggers')
const statics = require('./statics')
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const CollecionName = 'messages'

const schema = new Schema({
  text: {
    type: String,
    required: true
  },

  to: {
    type: ObjectId,
    ref: 'users',
    required: true
  },

  from: {
    type: ObjectId,
    ref: 'users',
    required: true
  }
}, {
  collection: CollecionName,
  timestamps: true
})

methods.register(schema)
triggers.register(schema)
statics.register(schema)

module.exports = mongoose.model(CollecionName, schema)
