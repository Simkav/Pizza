const basicHandler = (err, req, res, next) => {
  console.log(
    '============================================================================='
  )
  console.log(
    '                           ASHIBKA                                           '
  )
  console.error(err)
  console.log(
    '============================================================================='
  )
  res.statusCode = 400
  res.send(err.message)
}

module.exports = { basicHandler }
