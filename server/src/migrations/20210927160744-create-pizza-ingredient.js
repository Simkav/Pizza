'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pizzaIngredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pizzaId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'pizzas'
          },
          key: 'id'
        }
      },
      ingredientId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'ingredients'
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pizzaIngredients')
  }
}
