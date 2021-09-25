const { TokenExpiredError } = require('jsonwebtoken')

const authErrorHandler = async (err, req, res, next) => {
  if (err instanceof TokenExpiredError) {
    res.statusCode = 419
    return res.send({ data: {}, error: 'JWT token expired' })
  }
  next(err)
}

module.exports = { authErrorHandler }
