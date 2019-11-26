const bcrypt = require('bcrypt-nodejs')
const transporter = require('../../services/transporter')
const config = require('../../config')

function register (schema) {
  schema.pre('save', async function (next) {
    try {
      if (!this.isModified('password')) {
        return next()
      }
  
      this.password = bcrypt.hashSync(this.password)
  
      return next()
    } catch (error) {
      return next(error)
    }
  })
  
  schema.post('save', async function (doc, next) {
    try {
      const mailOptions = {
        from: 'noreply',
        to: this.email,
        subject: 'Confirm creating account',
        html: `
          <div>
            <h1>Hello new user!</h1>
            <p>
              Click <a href="${config.hostname}/api/auth/confirm?key=${this.activationKey}">link</a>
              to activate your new account.
            </p>
          </div>
          <div>
            <h1>Hello developer!</h1>
            <p>Feel free to change this template ;).</p>
          </div>`
      }
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })
  
      return next()
    } catch (error) {
      return next(error)
    }
  })
}

module.exports = {
  register
}