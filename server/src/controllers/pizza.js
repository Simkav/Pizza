const { Pizza, Ingredient } = require('../models')

let Pizzas = null

const setPizzas = pizzas => {
  const formated = pizzas
    .map(v => v.toJSON())
    .map(v => {
      const ingredients = v.Ingredients.reduce((acc, ingredient) => {
        acc.push(ingredient.id)
        return acc
      }, [])
      return { ...v, Ingredients: ingredients }
    })
  Pizzas = formated
}

const getAll = async (req, res, next) => {
  if (!Pizzas) {
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
    setPizzas(pizzas)
  }
  res.send(Pizzas)
}

module.exports = { getAll }
