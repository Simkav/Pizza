const express = require('express')
const router = require('./routers/router')
const cors = require('cors')
const path = require('path')
const app = express()

if (process.env.ENVIRONMENT === 'dev') {
  app.use(require('morgan')('dev'))
  app.use(require('response-time')())
} else {
  app.use(require('helmet')())
}

app.use(express.json())
app.use(cors())

app.use('/public', express.static(path.resolve(__dirname, '..', 'public')))

app.use(router)

module.exports = app
