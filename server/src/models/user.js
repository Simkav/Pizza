'use strict'
const { Model } = require('sequelize')
const { hash } = require('../helpers/crypto')

const hashPassword = user => {
  if (user.changed('password')) {
    const { password } = user
    user.password = hash(password)
  }
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {}
    comparePassword = password => {
      return hash(password) === this.getDataValue('password')
    }
  }
  User.init(
    {
      phone: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: true, unique: true },
      bonus: { type: DataTypes.DECIMAL, defaultValue: 0 }
    },
    {
      sequelize,
      tableName: 'users'
    }
  )

  User.beforeCreate(hashPassword)
  User.beforeUpdate(hashPassword)

  return User
}
