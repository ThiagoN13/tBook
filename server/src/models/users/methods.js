const bcrypt = require('bcrypt-nodejs')

function register (schema) {
  schema.methods = {
    transform () {
      const transformed = {}
      const fields = ['id', 'name', 'email', 'createdAt', 'role']

      fields.forEach((field) => {
        transformed[field] = this[field]
      })

      return transformed
    },

    passwordMatches (password) {
      return bcrypt.compareSync(password, this.password)
    }
  }
}

module.exports = {
  register
}
