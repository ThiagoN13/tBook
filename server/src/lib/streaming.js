const { Readable } = require('stream')

module.exports = {
  createReadStreamFromBuffer (buffer) {
    const readstream = new Readable()

    readstream.push(buffer)
    readstream.push(null)

    return readstream
  },

  /**
   * Converte um stream de GridReadStream para uma instancia de Buffer()
   * @param read_stream GridReadStream
   * @returns Buffer
   */
  getBufferFromStream (stream) {
    return new Promise((resolve, reject) => {
      const file = []
      stream.on('data', function (chunk) {
        file.push(chunk)
      })
      stream.on('error', e => {
        reject(e)
      })
      stream.on('end', function () {
        // concatenar o array de chunks do arquivo em uma instancia de Buffer
        resolve(Buffer.concat(file))
      })
    })
  }
}
