'use strict'

const mongoose = require('mongoose')
const methods = require('./methods')
const triggers = require('./triggers')
const statics = require('./statics')
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const CollecionName = 'posts'

const schema = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: 'users'
  },

  text: {
    type: String
  },

  likes: [{
    type: ObjectId
  }],

  image: {
    type: ObjectId,
    ref: 'images'
  }
}, {
  collection: CollecionName,
  timestamps: true
})

methods.register(schema)
triggers.register(schema)
statics.register(schema)

module.exports = mongoose.model(CollecionName, schema)
