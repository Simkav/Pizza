const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const signJWT = promisify(jwt.sign)
const verifyJWT = promisify(jwt.verify)

const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_TIME
} = require('../constatns')

const tokenConfig = {
  access: {
    secret: ACCESS_TOKEN_SECRET,
    time: ACCESS_TOKEN_TIME
  },
  refresh: {
    secret: REFRESH_TOKEN_SECRET,
    time: REFRESH_TOKEN_TIME
  }
}

const createToken = (payload, { time, secret }) =>
  signJWT(
    {
      userId: payload.id,
      email: payload.email
    },
    secret,
    { expiresIn: time }
  )
const verifyToken = (token, { secret }) => verifyJWT(token, secret)

createTokenPair = async payload => {
  return {
    refresh: await createToken(payload, tokenConfig.refresh),
    access: await createToken(payload, tokenConfig.access)
  }
}

verifyAccessToken = token => verifyToken(token, tokenConfig.access)

verifyRefreshToken = token => verifyToken(token, tokenConfig.refresh)

module.exports = {
  createTokenPair,
  verifyAccessToken,
  verifyRefreshToken
}