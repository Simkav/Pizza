const { verifyAccessToken } = require('./jwtService')

const parseAuthorization = async authorization => {
  const [scheme, token] = authorization.split(' ')
  if (scheme !== 'Bearer') {
    throw new Error('Wrong authentication schema')
  }
  return await verifyAccessToken(token)
}

module.exports = parseAuthorization
