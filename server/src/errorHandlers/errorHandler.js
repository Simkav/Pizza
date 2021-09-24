const { basicHandler } = require('./basicErrorHandler')
const { authErrorHandler } = require('./authErrorHandler')
const { customErrorHandler } = require('./customErrorHandler')
module.exports = { customErrorHandler, authErrorHandler, basicHandler }
