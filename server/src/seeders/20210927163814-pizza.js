'use strict'

const defaultPizza = {
  name: 'Пицца абобус',
  price: 100.0,
  weight: 120,
  image: '/pizzas/testPizza.png'
}

const pizzaArr = Array(10)
  .fill(null)
  .map((_, i) => {
    const name = defaultPizza.name + i
    return { ...defaultPizza, name }
  })

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('pizzas', pizzaArr, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('pizzas', null, {})
  }
}
