const Images = require('../../models/images')
const multer = require('multer')
const sharp = require('sharp')

exports.upload = async (req, res) => {
  try {
    await imageUploader({ req, res, fieldName: 'images' })

    const { files } = req
    const promises = []

    for (const file of files) {
      const promise = attachImage({ file, payload: req.body })
      promises.push(promise)
    }

    const dataset = await Promise.all(promises)

    res.json({ dataset })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.get = async (req, res) => {
  const { _id } = req.params
  const MAX_SIZE = 8000

  try {
    const imagem = await Images.findById(_id)
    const imgInfo = await Images.bucketFindOne(_id)

    if (!imagem) {
      throw new Error('E001: Imagem ou video não encontrado')
    }

    const isVideo = imgInfo.contentType.includes('video')

    if (isVideo) {
      return streamming(req, res, imgInfo, imagem)
    }

    if (req.params['0']) {
      const stream = await imagem.read()
      const size = Number(req.params['0'].replace(/\D+/g, ''))

      if (size > MAX_SIZE) {
        throw new Error('E002: "Size" excede o limite máximo')
      }

      const resize = sharp().resize(size)

      return stream
        .pipe(resize)
        .pipe(res)
    }
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

async function streamming (req, res, info, video) {
  try {
    const fileSize = info.length
    const { range } = req.headers
    const stream = await video.read()

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-')
      const start = parseInt(parts[0], 10)
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize - 1

      const chunksize = (end - start) + 1

      console.log('streaming: ', start, end)

      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': info.contentType
      }

      res.writeHead(206, head)

      stream.pipe(res)
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': info.contentType
      }

      res.writeHead(200, head)

      stream.pipe(res)
    }
  } catch (error) {
    console.log(error)
  }
}

function attachImage ({ file, payload = {} } = {}) {
  payload.name = file.originalname
  const imagem = new Images(payload)

  return imagem.attachFile({ name: payload.name, buffer: file.buffer, type: file.mimetype })
}

function imageUploader ({ req, res, fieldName = 'images', fileLimit = 100 }) {
  const upload = multer().array(fieldName, fileLimit)

  return new Promise((resolve, reject) => {
    upload(req, res, error => {
      if (error) {
        return reject(error)
      }

      resolve()
    })
  })
}
