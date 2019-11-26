'use strict'

const Model = require('../../models/users')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const httpStatus = require('http-status')
const uuidv1 = require('uuid/v1')

exports.register = async (req, res, next) => {
  try {
    req.body.activationKey = uuidv1()

    const user = new Model(req.body)
    const savedUser = await user.save()

    res.status(httpStatus.CREATED)

    res.send(savedUser.transform())
  } catch (error) {
    return next(Model.checkDuplicateEmailError(error))
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await Model.findAndGenerateToken(req.body)
    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.secret)

    return res.json({ message: 'OK', token: token })
  } catch (error) {
    next(error)
  }
}

exports.confirm = async (req, res, next) => {
  try {
    await Model.findOneAndUpdate(
      { 'activationKey': req.query.key },
      { 'active': true }
    )

    return res.json({ message: 'OK' })
  } catch (error) {
    next(error)
  }
}
