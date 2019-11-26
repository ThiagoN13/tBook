/*
    load the config set on environment NODE_ENV
    /config/env/development.js
    /config/env/production.js
    /config/env/tests.js
 */

const all = require('./env/all')
const devSettings = require('./env/dev')
const prodSettings = require('./env/prod')
const testSettings = require('./env/test')

const envName = process.env.NODE_ENV || 'development'
let settings = {}

if (envName === 'development') {
  settings = Object.assign(settings, all, devSettings)
} else if (envName === 'test') {
  settings = Object.assign(settings, all, testSettings)
} else {
  settings = Object.assign(settings, all, prodSettings)
}

module.exports = settings
