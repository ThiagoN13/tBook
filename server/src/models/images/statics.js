const { isEmpty } = require('lodash')
const { Attachment } = require('./gridfs')
const { Types } = require('mongoose')

const { ObjectId } = Types

function register (schema) {
  schema.statics = {
    getImagemById (_id) {
      if (isEmpty(_id)) return Promise.reject(new ReferenceError('ID invalido'))

      return this.findOne({ _id })
    },

    bucketFindOne (_id) {
      if (isEmpty(_id)) return Promise.reject(new ReferenceError('ID invalido'))

      return Attachment.findOne({ 'metadata.ref': ObjectId(_id) })
    },

    getImagemByFileId (imageRef) {
      if (isEmpty(imageRef)) return Promise.reject(new ReferenceError('id invalido'))

      return this.findOne({ imageRef })
    }
  }
}

module.exports = {
  register
}
