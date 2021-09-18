const Router = require('express').Router()
const userRouter = require('./user')

Router.use('/auth', userRouter)

module.exports = Router
