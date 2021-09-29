const { Pizza, Ingredient } = require('../models')

let pizzasCache = null

const updateCache = async () => {
  try {
    const pizzas = await Pizza.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Ingredient,
          attributes: ['id'],
          through: { attributes: [] }
        }
      ]
    })
    const formated = pizzas
      .map(v => v.toJSON())
      .map(v => {
        const ingredients = v.Ingredients.reduce((acc, ingredient) => {
          acc.push(ingredient.id)
          return acc
        }, [])
        return { ...v, Ingredients: ingredients }
      })
    pizzasCache = formated
  } catch (error) {
    throw new Error('Server Error')
  }
}

const getAll = async (req, res, next) => {
  if (!pizzasCache) {
    await updateCache()
  }
  console.log(pizzasCache)
  res.send({ data: pizzasCache, error: {} })
}

module.exports = { getAll }
