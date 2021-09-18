const yup = require('yup')
require('yup-phone')
const userAuthSchema = yup.object().shape({
  phone: yup.string().phone('UA', true, 'Wrong phone number').required(),
  password: yup
    .string()
    .min(6)
    .required()
})

module.exports = {
  userAuthSchema
}
