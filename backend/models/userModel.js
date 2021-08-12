const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

class User extends Model {}

User.init({
  id: DataTypes.NUMBER,
  lastName: DataTypes.STRING,
  firstName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
})