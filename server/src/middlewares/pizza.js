const { Pizza } = require('../models')
const CustomError = require('../errors/customError')
const findPizza = async (req, res, next) => {
  const { id } = req.params
  try {
    const Pizza = await Pizza.findByPk(id)
    if (!Pizza) {
      return next(new CustomError('Pizza not found'))
    }
    req.pizza = Pizza
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { findPizza }
