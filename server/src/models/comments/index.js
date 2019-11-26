'use strict'

const mongoose = require('mongoose')
const methods = require('./methods')
const triggers = require('./triggers')
const statics = require('./statics')
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const CollecionName = 'comments'

const schema = new Schema({
  post: {
    type: ObjectId,
    required: true,
    ref: 'posts'
  },

  user: {
    type: ObjectId,
    required: true,
    ref: 'users'
  }
}, {
  collection: CollecionName,
  timestamps: true
})

methods.register(schema)
triggers.register(schema)
statics.register(schema)

module.exports = mongoose.model(CollecionName, schema)
