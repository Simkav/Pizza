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

const createPizza = async (req, res, next) => {
  /* 
  TODO
  add validation body
  add error handlers
  fix security 80000
  */
  const {
    body: { name, price, weight },
    ingredients
  } = req
  const imgPath = `/pizzas/${req.file.filename}`
  const pizzaData = {
    name,
    price: +price,
    weight: +weight,
    image: imgPath
  }
  const newPizza = await Pizza.create(pizzaData)
  await newPizza.addIngredients(ingredients)
  updateCache()
  res.send({ data: { id: newPizza.getDataValue('id') } })
}

const deletePizza = async (req, res, next) => {
  try {
    const { pizza } = req
    /* 
    TODO
    Add checks + validation
    */
    await pizza.destroy()
    updateCache()
    return res.send({ data: {}, error: {} })
  } catch (error) {
    next(error)
  }
}

const updatePizza = async (req, res, next) => {
  /* 
  TODO
  add validation checks
  */
  try {
    const { body, pizza } = req
    await pizza.update(body)
    updateCache()
    res.send({ data: pizza, error: {} })
  } catch (error) {
    next(error)
  }
}

const updateImage = async (req, res, next) => {
  try {
    const {
      pizza,
      file: { filename }
    } = req
    const imgPath = `/pizzas/${filename}`
    await pizza.update({ image: imgPath })
    updateCache()
    res.send({ data: { img: imgPath }, error: {} })
  } catch (error) {
    next(error)
  }
}

const updateIngredient = async (req, res, next) => {
  try {
    const { pizza, ingredients } = req
    await pizza.setIngredients(ingredients)
    updateCache()
    res.send({ data: { ingredients }, error: {} })
  } catch (error) {
    next(error)
  }
}

// TODO add logic for update image and ingredients

module.exports = {
  getAll,
  createPizza,
  deletePizza,
  updatePizza,
  updateImage,
  updateIngredient
}
