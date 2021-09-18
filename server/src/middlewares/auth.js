const { User } = require('../models/index')
const userValidation = require('../validations/user')
const { verifyRefreshToken } = require('../helpers/jwtService')
const checkUserCredentials = async (req, res, next) => {
  try {
    const userBody = req.body
    await userValidation.userAuthSchema.validate(userBody)
    next()
  } catch (error) {
    next(error)
  }
}

const findUser = async (req, res, next) => {
  try {
    const { phone } = req.body
    console.log(phone)
    const findedUser = await User.findOne({ where: { phone } })
    if (!findedUser) {
      return next(new Error('User not found'))
    }
    req.user = findedUser
    next()
  } catch (error) {
    next(error)
  }
}

const checkRefreshToken = async (req, res, next) => {
  try {
    const {
      body: { token }
    } = req
    console.log(token)
    req.token = await verifyRefreshToken(token)
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { checkUserCredentials, findUser, checkRefreshToken }
