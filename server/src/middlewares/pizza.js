const { Pizza, Ingredient } = require('../models')
const CustomError = require('../errors/customError')
const findPizza = async (req, res, next) => {
  const { id } = req.params
  try {
    const findedPizza = await Pizza.findByPk(id)
    if (!findedPizza) {
      return next(new CustomError('Pizza not found'))
    }
    req.pizza = findedPizza
    next()
  } catch (error) {
    next(error)
  }
}

const parseIngredients = async (req, res, next) => {
  try {
    req.body.ingredients = JSON.parse(req.body.ingredients)
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { findPizza, parseIngredients }
