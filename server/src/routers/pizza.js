const Router = require('express').Router()
const PizzaController = require('../controllers/pizza')
const { pizzasStorage } = require('../services/multer')
const PizzaMw = require('../middlewares/pizza')
Router.get('/', PizzaController.getAll)

Router.post('/', pizzasStorage.single('img'), PizzaController.createPizza)

Router.route('/:id')
  .all(PizzaMw.findPizza)
  .delete(PizzaController.deletePizza)
  .patch(PizzaController.deletePizza)

// TODO add logic for update image and ingredients

module.exports = Router
