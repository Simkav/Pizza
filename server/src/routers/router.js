const express = require('express')
const userRouter = require('./user')
const Router = express.Router()

Router.use('/users', userRouter)

module.exports = Router
