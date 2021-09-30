const express = require('express')
const ingredientController = require('../controllers/ingredient')
const ingredientRouter = express.Router()
const authMiddleware = require('../middlewares/auth')
const ingredientMiddleware = require('../middlewares/ingredient')

ingredientRouter.get('/', ingredientController.getAll)

ingredientRouter.use(authMiddleware.checkAccesToken, authMiddleware.isAdmin)
ingredientRouter.post('/', ingredientController.create)

ingredientRouter
  .route('/:id')
  .all(ingredientMiddleware.findIngredient)
  .delete(ingredientController.deleteById)
  .patch(ingredientController.updateIngridient)

module.exports = ingredientRouter
