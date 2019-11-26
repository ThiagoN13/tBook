const express = require('express')
const router = express.Router()
const auth = require('../../../middlewares/authorization')
const controller = require('../../../controllers/images')

router.post('/upload', auth(), controller.upload)

router.get('/get/:_id*', auth(), controller.get)

module.exports = router
