const express = require('express')
const router = require('./routers/router')
const morgan = require('morgan')
const responseTime = require('response-time')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(morgan('dev'))
app.use(responseTime())
app.use(express.json())
app.use(cors())

app.use('/public', express.static(path.resolve(__dirname, '..', 'public')))

app.use(router)

module.exports = app
