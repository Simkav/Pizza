'use strict'

const ingredients =
  'сир моцарела, філе куряче копчене, помідор, соус сирний, орегано базилік, cоус томатний, філе куряче в соусі теріякі, ананас, імбирь, мікс кунжуту, соус теріякі, cоус білий, філе куряче, кукурудза'
const ingredientsArr = ingredients.split(', ')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'ingredients',
      ingredientsArr.map(val => ({
        name: val,
      })),
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      'ingredients',
      ingredientsArr.map(val => ({ name: val })),
      {}
    )
  }
}
