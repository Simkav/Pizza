const omit = require('lodash/omit')
const omitFn = (Object, exclude) => omit(Object, exclude)

module.exports = omitFn
