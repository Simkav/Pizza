'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PizzaIngredient extends Model {
    static associate (models) {}
  }
  PizzaIngredient.init(
    {
      pizzaId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'pizzas',
          key: 'id'
        }
      },
      ingredientId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'ingredients',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      tableName: 'pizzaIngredients'
    }
  )
  return PizzaIngredient
}
