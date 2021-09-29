const { Ingredient } = require('../models/index')
const CustomError = require('../errors/customError')

let ingredientsCache = null

const refreshIngredients = async () => {
  try {
    ingredientsCache = null
    const ingredients = await Ingredient.findAll({
      raw: true,
      attributes: ['id', 'name']
    })
    console.log(ingredients)
    if (!ingredients) {
      throw new Error(ingredients)
    }
    ingredientsCache = ingredients
  } catch (error) {
    throw new Error('Server Error')
  }
}

const getAll = async (req, res, next) => {
  try {
    if (!ingredientsCache) {
      await refreshIngredients()
    }
    res.send({ data: { ingredients: ingredientsCache } })
  } catch (error) {
    next(error)
  }
}
const deleteById = async (req, res, next) => {
  try {
    const { ingredient } = req
    const deleted = await ingredient.destroy()
    if (!deleted) {
      return res.send({ data: {}, error: 'Not found' })
    }
    refreshIngredients()
    res.send()
  } catch (error) {
    next(error)
  }
}
const create = async (req, res, next) => {
  try {
    const { body } = req
    //TODO REFACTOR
    if (!body.name) {
      return next(new CustomError('Missing name'))
    }
    const created = await Ingredient.create({ name: body.name })
    refreshIngredients()
    res.send({ data: { id: created.getDataValue('id') } })
  } catch (error) {
    next(error)
  }
}

const updateIngridient = async (req, res, next) => {
  try {
    const {
      body: { name },
      ingredient
    } = req
    // TODO Check on pointless change
    const updated = await ingredient.update({ name })
    refreshIngredients()
    res.send({ data: { name: updated.getDataValue('name') }, error: {} })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll, deleteById, create, updateIngridient }
