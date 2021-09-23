const Router = require('express').Router()
const userRouter = require('./user')
const errorHandlers = require('../errorHandlers/errorHandler')
const ingredientRouter = require('./ingredient')

Router.use('/auth', userRouter)

Router.use('/ingredient', ingredientRouter)

Router.use(errorHandlers.basicHandler)

module.exports = Router
