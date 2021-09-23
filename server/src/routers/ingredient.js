const express = require('express')
const ingredientController = require('../controllers/ingredient')
const ingredientRouter = express.Router()
const authMiddleware = require('../middlewares/auth')

ingredientRouter.get('', ingredientController.getAll)
ingredientRouter.delete(
  '/:ingredientId',
  authMiddleware.checkAccesToken,
  authMiddleware.isAdmin,
  ingredientController.deleteById
)
ingredientRouter.post(
  '',
  authMiddleware.checkAccesToken,
  authMiddleware.isAdmin,
  ingredientController.create
)

module.exports = ingredientRouter
