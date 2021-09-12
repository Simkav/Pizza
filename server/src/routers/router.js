const express = require('express')

const Router = express.Router()

Router.all('/test', (req, res, next) => {
  res.statusCode = 200
  res.send('ok')
})

module.exports = Router
