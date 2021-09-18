const Router = require('express').Router()
const userRouter = require('./user')
const errorHandlers = require('../errorHandlers/errorHandler')
const secondRouter = require('express').Router()

Router.use('/auth', userRouter)

Router.use(errorHandlers.basicHandler)

module.exports = Router
