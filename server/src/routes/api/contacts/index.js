const express = require('express')
const router = express.Router()
const controller = require('../../../controllers/contacts')
const auth = require('../../../middlewares/authorization')

router
  .post('/', auth(), controller.create)
  .get('/', auth(), controller.get)
  .delete('/', auth(), controller.remove)
  .put('/', auth(), controller.update)

module.exports = router
