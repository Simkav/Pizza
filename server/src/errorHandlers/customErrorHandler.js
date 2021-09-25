const CustomError = require('../errors/customError')

const customErrorHandler = async (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.statusCode = 400
    return res.send({ data: {}, error: err.message })
  }
  next(err)
}

module.exports = { customErrorHandler }
