const { Ingredient } = require('../models/index')

const getAll = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.findAll({ attributes: ['id', 'name'] })
    res.send({ data: { ingredients } })
  } catch (error) {
    next(error)
  }
}
const deleteById = async (req, res, next) => {
  try {
    const {
      params: { ingredientId }
    } = req
    const deleted = await Ingredient.destroy({ where: { id: ingredientId } })
    if (deleted) {
      res.send()
    }
    res.send({ data: {}, error: 'Not found' })
  } catch (error) {
    next(error)
  }
}
const create = async (req, res, next) => {
  try {
    const { body } = req
    //TODO REFACTOR
    if (!body.name) {
      next(new Error('Missing name'))
    }
    const created = await Ingredient.create({ name: body.name })
    res.send({ data: { id: created.getDataValue('id') } })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, deleteById, create }
