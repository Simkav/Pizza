'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    static associate (models) {}
  }
  Ingredient.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: { type: DataTypes.STRING }
    },
    {
      sequelize,
      tableName: 'ingredients'
    }
  )
  return Ingredient
}
