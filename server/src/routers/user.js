const express = require('express')
const { createUser } = require('../controllers/user')
const userRouter = express.Router()

userRouter.post('/', createUser)
userRouter.get('/', (req, res, next) => {
  res.send('ok')
})

module.exports = userRouter
