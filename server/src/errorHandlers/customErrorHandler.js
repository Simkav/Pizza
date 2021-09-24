const CustomError = require('../errors/customError')

const customErrorHandler = async (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.statusCode = 419
    return res.send(err.message)
  }
  next(err)
}

module.exports = { customErrorHandler }
