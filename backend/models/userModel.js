const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory");

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    email: DataTypes.STRING, unique: true,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    timestamps: true,
    updatedAt: 'updateTimestamp',
    modelName: "User",
    tableName: "users"
  }
);

//User.sync()

module.exports = { User };