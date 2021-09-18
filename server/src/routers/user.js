const userRouter = require('express').Router()
const authController = require('../controllers/auth')
const authMiddlewares = require('../middlewares/auth')

userRouter.post(
  '/sign-up',
  authMiddlewares.checkUserCredentials,
  authController.register
)
userRouter.post(
  '/sign-in',
  authMiddlewares.checkUserCredentials,
  authMiddlewares.findUser,
  authController.login
)
userRouter.post(
  '/refresh',
  authMiddlewares.checkRefreshToken,
  authController.refreshTokens
)

module.exports = userRouter
