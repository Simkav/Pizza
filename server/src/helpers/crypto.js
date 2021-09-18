const { createHash } = require('crypto')

const hash = password =>
  createHash('sha256')
    .update(password)
    .digest('hex')

module.exports = { hash }
