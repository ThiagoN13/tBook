const { createReadStream } = require('fs')
const { createReadStreamFromBuffer } = require('../../lib/streaming')
const { Attachment } = require('./gridfs')

function register (schema) {
  schema.methods = {
    /**
     * @method attachFile
     * @return {Promise}
     */
    attachFile ({ name = 'unknownfile', type = '', path, readstream, buffer }) {
      if (buffer) {
        readstream = createReadStreamFromBuffer(buffer)
      } else if (!readstream) {
        readstream = createReadStream(path)
      }

      return new Promise((resolve, reject) => {
        Attachment.writeFile({
          filename: name,
          contentType: type,
          metadata: {
            // guardar referencia do model vinculado ao imageRef
            ref: this._id
          }
        },
        readstream,
        (err, createdFile) => {
          if (err) {
            return reject(err)
          }
          this.imageRef = createdFile._id

          // salvar automaticamente para garantir os vinculos do imageRef e do documento
          this.save().then(r => resolve(createdFile))
        })
      })
    },

    /**
     * readFile - recupera do gridfs um buffer
     * @returns {Promise<Buffer>} Retorna um objeto buffer
     */
    readFile (options = {}) {
      return new Promise((resolve, reject) => {
        options = Object.assign(options, { _id: this.imageRef })

        Attachment.readFile(options, (error, unlinkedAttachment) => {
          if (error) {
            return reject(error)
          }

          resolve(unlinkedAttachment)
        })
      })
    },

    read () {
      return Attachment.readFile({ _id: this.imageRef })
    },

    deleteFile () {
      return new Promise((resolve, reject) => {
        Attachment.deleteFile(this.imageRef, (error, unlinkedAttachment) => {
          if (error) {
            return reject(error)
          }

          resolve(unlinkedAttachment)
        })
      })
    }
  }
}

module.exports = {
  register
}
