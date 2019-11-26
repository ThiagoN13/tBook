const httpStatus = require('http-status')
const APIError = require('../../lib/APIError')

function register (schema, roles) {
  schema.statics = {
    roles,

    checkDuplicateEmailError (err) {
      if (err.code === 11000) {
        const error = new Error('Email already taken')

        error.errors = [{
          field: 'email',
          location: 'body',
          messages: ['Email already taken']
        }]

        error.status = httpStatus.CONFLICT

        return error
      }

      return err
    },

    async findAndGenerateToken (payload) {
      const { email, password } = payload

      if (!email) throw new APIError('Email must be provided for login')

      const user = await this.findOne({ email }).exec()

      if (!user) throw new APIError(`No user associated with ${email}`, httpStatus.NOT_FOUND)

      const passwordOK = await user.passwordMatches(password)

      if (!passwordOK) throw new APIError(`Password mismatch`, httpStatus.UNAUTHORIZED)

      if (!user.active) throw new APIError(`User not activated`, httpStatus.UNAUTHORIZED)

      return user
    }
  }
}

module.exports = {
  register
}
