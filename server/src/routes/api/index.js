'use strict'
const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()
const authRouter = require('./auth')
const commentsRouter = require('./comments')
const contactsRouter = require('./contacts')
const postsRouter = require('./posts')
const imagesRouter = require('./images')
const messagesRouter = require('./messages')

function seekRoutesAndAttachSession (currentDir) {
  for (const child of fs.readdirSync(currentDir)) {
    const currentPath = path.join(currentDir, child)
    try {
      if (fs.statSync(currentPath).isDirectory()) {
        seekRoutesAndAttachSession(currentPath)
      } else {
        // so incluir arquivos index.mjs. todas as rotas devem estar em arquivos index.mjs
        if (fs.statSync(currentPath).isFile() && child.includes('index.')) {
          let router = null
          const module = require(currentPath)
          // tratamento do polyfill
          if (module.__esModule) {
            router = module.default
          } else {
            router = module
          }
          const moduleSplited = currentPath.split('/')
          const moduleName = moduleSplited[moduleSplited.length - 2]

          if (moduleName !== 'api') {
            // router.use(`/${moduleName}`, router)
          }
        }
      }
    } catch (e) {
      // erro com o diretorio, igonorar e continuar
      console.error(e)
    }
  }
}

seekRoutesAndAttachSession(__dirname)

router.get('/status', (req, res) => { res.send({ status: 'OK' }) }) // api status

// mount auth paths
router.use('/auth', authRouter)
router.use('/comments', commentsRouter)
router.use('/contacts', contactsRouter)
router.use('/posts', postsRouter)
router.use('/images', imagesRouter)
router.use('/messages', messagesRouter)

module.exports = router
