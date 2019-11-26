'use strict'
const mongoose = require('mongoose')
const methods = require('./methods')
const triggers = require('./triggers')
const statics = require('./statics')
const Schema = mongoose.Schema

const CollecionName = 'users'

const roles = [
  'user', 'admin'
]

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 128
  },

  name: {
    type: String,
    maxlength: 50
  },

  activationKey: {
    type: String,
    unique: true
  },

  active: {
    type: Boolean,
    default: false
  },

  role: {
    type: String,
    default: 'user',
    enum: roles
  }
}, {
  collection: CollecionName,
  timestamps: true
})

methods.register(schema)
triggers.register(schema)
statics.register(schema, roles)

module.exports = mongoose.model(CollecionName, schema)
