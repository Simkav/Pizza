const Router = require('express').Router()
const PizzaController = require('../controllers/pizza')
Router.get('/', PizzaController.getAll)

module.exports = Router
