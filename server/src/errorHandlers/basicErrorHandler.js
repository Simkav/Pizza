const basicHandler = (err, req, res, next) => {
  console.log(
    `=============================================================================
                                ASHIBKA                                           `
  )
  const error = err.stack.split('\n').map(v => v.trim())
  const header = error.shift()
  const trace = error.filter(v => v.includes('/home/node/app/src'))
  console.log(header)
  console.log(trace)
  console.log(
    '============================================================================='
  )
  console.log(err)
  console.log(
    '============================================================================='
  )
  res.statusCode = 400
  res.send({ data: {}, error: err.message })
}

module.exports = { basicHandler }
