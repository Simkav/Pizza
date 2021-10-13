const PizzaRouter = require('express').Router()
const PizzaController = require('../controllers/pizza')
const { pizzasStorage } = require('../services/multer')
const PizzaMw = require('../middlewares/pizza')
const { findIngredients } = require('../middlewares/ingredient')
const AuthMw = require('../middlewares/auth')

PizzaRouter.get('/', PizzaController.getAll)

PizzaRouter.use(AuthMw.checkAccesToken, AuthMw.isAdmin)

PizzaRouter.post(
  '/',
  pizzasStorage.single('img'),
  PizzaMw.parseIngredients,
  findIngredients,
  PizzaController.createPizza
)

PizzaRouter.route('/:id')
  .all(PizzaMw.findPizza)
  .delete(PizzaController.deletePizza)
  .patch(PizzaController.updatePizza)

PizzaRouter.patch(
  '/:id/image',
  PizzaMw.findPizza,
  pizzasStorage.single('img'),
  PizzaController.updateImage
)

PizzaRouter.patch(
  '/:id/ingredients',
  PizzaMw.findPizza,
  findIngredients,
  PizzaController.updateIngredient
)

module.exports = PizzaRouter
