const { Ingredient } = require('../models')
const CustomError = require('../errors/customError')
const findIngredient = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req
    const ingredient = await Ingredient.findByPk(id)
    if (!ingredient) {
      return next(new CustomError('Ingredient not found'))
    }
    req.ingredient = ingredient
    next()
  } catch (error) {
    next(error)
  }
}
const findIngredients = async (req, res, next) => {
  try {
    const { ingredients } = req.body
    console.log(ingredients)
    const findedIngredients = await Ingredient.findAll({
      where: { id: ingredients }
    })
    req.ingredients = findedIngredients
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { findIngredient, findIngredients }
