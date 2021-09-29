const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '..', '..', 'public', 'pizzas'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const pizzasStorage = multer({ storage })

module.exports = { pizzasStorage }
