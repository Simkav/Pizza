const Router = require('express').Router()
const authRouter = require('./auth')
const errorHandlers = require('../errorHandlers/errorHandler')
const ingredientRouter = require('./ingredient')
const pizzaRouter = require('./pizza')

Router.use('/auth', authRouter)

Router.use('/ingredient', ingredientRouter)

Router.use('/pizza', pizzaRouter)

Router.use(
  errorHandlers.authErrorHandler,
  errorHandlers.customErrorHandler,
  errorHandlers.basicHandler
)

module.exports = Router
