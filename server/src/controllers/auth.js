const { User } = require('../models/index')
const { createTokenPair } = require('../helpers/jwtService')

const register = async (req, res, next) => {
  const userBody = req.body
  try {
    const createdUser = await User.create({
      phone: userBody.phone,
      password: userBody.password
    })
    const tokens = await createTokenPair({
      id: createdUser.getDataValue('id'),
      phone: createdUser.getDataValue('phone')
    })
    res.send({ data: tokens })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const {
      body: { password },
      user
    } = req
    if (!user.comparePassword(password)) {
      return next(new Error('Wrong password'))
    }
    const tokens = await createTokenPair({
      id: user.getDataValue('id'),
      phone: user.getDataValue('phone')
    })
    res.send({ data: tokens })
  } catch (error) {
    next(error)
  }
}

const refreshTokens = async (req, res, next) => {
  try {
    const { id } = req.token
    const findedUser = await User.findByPk(id)
    const tokens = await createTokenPair({
      id: findedUser.getDataValue('id'),
      phone: findedUser.getDataValue('phone')
    })
    res.send({ data: tokens })
  } catch (error) {
    next(error)
  }
}

module.exports = { register, login, refreshTokens }
