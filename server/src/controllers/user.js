const { User } = require('../models/index')
const { createTokenPair } = require('../helpers/jwtService')

const createUser = async (req, res, next) => {
  const userBody = req.body
  try {
    const createdUser = await User.create(userBody)
    const tokens = await createTokenPair({
      id: createdUser.getDataValue('id'),
      email: createdUser.getDataValue('email')
    })
    res.send({ data: tokens })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = { createUser }
