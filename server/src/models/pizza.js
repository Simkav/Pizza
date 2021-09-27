'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Pizza extends Model {
    static associate ({ Ingredient, PizzaIngredient }) {
      Pizza.belongsToMany(Ingredient, {
        through: PizzaIngredient,
        foreignKey: 'pizzaId'
      })
    }
  }
  Pizza.init(
    {
      name: { type: DataTypes.STRING, unique: true, allowNull: false },
      price: { type: DataTypes.DECIMAL, allowNull: false },
      weight: { type: DataTypes.INTEGER, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: false }
    },
    {
      sequelize,
      tableName: 'pizzas'
    }
  )
  return Pizza
}
