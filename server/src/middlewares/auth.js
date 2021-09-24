const { User } = require('../models/index')
const userValidation = require('../validations/user')
const { verifyRefreshToken } = require('../helpers/jwtService')
const parseAuthorization = require('../helpers/parseAuthorization')
const CustomError = require('../errors/customError')

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
    const findedUser = await User.findOne({ where: { phone } })
    if (!findedUser) {
      return next(new CustomError('User not found'))
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
    req.token = await verifyRefreshToken(token)
    next()
  } catch (error) {
    next(error)
  }
}

const checkAccesToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization }
    } = req
    if (!authorization) {
      return next(new CustomError('Empty authorization header'))
    }
    const user = await parseAuthorization(authorization)
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

const isAdmin = async (req, res, next) =>
  req.user.isAdmin === true ? next() : next(new CustomError('Not a admin'))

module.exports = {
  checkUserCredentials,
  findUser,
  checkRefreshToken,
  checkAccesToken,
  isAdmin
}
