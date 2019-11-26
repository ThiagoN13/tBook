const Model = require('../../models/contacts')

exports.create = async (req, res, next) => {
  const result = await Model.create(req.body)

  res.json(result)
}

exports.get = async (req, res, next) => {
  const result = await Model.find()

  res.json(result)
}

exports.remove = async (req, res, next) => {
  const { _id } = req.body

  const result = await Model.remove({ _id })

  res.json(result)
}

exports.update = async (req, res, next) => {
  const { _id, ...data } = req.body

  const result = await Model.update({ _id }, data)

  res.json(result)
}
