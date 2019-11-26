require('dotenv').config() // load .env file

module.exports = {
  port: 3010,
  app: 'tBook',
  env: 'dev',
  secret: 'hi9372App',
  hostname: `http://localhost:${this.port}`,
  mongo: {
    uri: 'mongodb://localhost:27017/tBook'
  },
  transporter: {
    service: process.env.TRANSPORTER_SERVICE,
    email: process.env.TRANSPORTER_EMAIL,
    password: process.env.TRANSPORTER_PASSWORD
  }
}
