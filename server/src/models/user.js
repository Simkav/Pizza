'use strict'
const { Model } = require('sequelize')
const { createHash } = require('crypto')

const hashPassword = user => {
  if (user.changed('password')) {
    const { password } = user
    const hashedPassword = createHash('sha256')
      .update(password)
      .digest('hex')
    user.password = hashedPassword
  }
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {}
    comparePassword = password =>
      hashPassword(password) === this.getDataValue('password')
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
      modelName: 'User'
    }
  )

  User.beforeCreate(hashPassword)
  User.beforeUpdate(hashPassword)

  return User
}
