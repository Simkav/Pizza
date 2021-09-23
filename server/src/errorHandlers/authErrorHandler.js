const { TokenExpiredError } = require('jsonwebtoken')

const authErrorHandler = async (err, req, res, next) => {
  if (err instanceof TokenExpiredError) {
    res.statusCode = 419
    return res.send('JWT token expired')
  }
  next(err)
}

module.exports = { authErrorHandler }
