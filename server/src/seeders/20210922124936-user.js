'use strict'

const { hash } = require('../helpers/crypto')

const userTemplate = {
  phone: '+380960000000',
  password: hash('111111'),
  email: 'testEmail@gmail.com',
  is_admin: false
}

const users = new Array(9).fill(0).map((_, i) => {
  let phone = userTemplate.phone.split('')
  phone[phone.length - 1] = i
  phone = phone.join('')
  return {
    password: userTemplate.password,
    phone,
    email: `${i + userTemplate.email}`,
    is_admin: false
  }
})
users.push({
  phone: '+380960000009',
  password: userTemplate.password,
  email: 'admin@gmail.com',
  is_admin: true
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', users, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      'users',
      users.map(v => ({ phone: v.phone })),
      {}
    )
  }
}
