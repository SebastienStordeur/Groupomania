module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    lastName: {
      type: Sequelize.STRING(20),
      required: true,
      validate: {
        len: [3, 20],
      },
    },
    firstName: {
      type: Sequelize.STRING(20),
      required: true,
      validate: {
        len: [3, 20],
      }
    },
    email: {
      type: Sequelize.STRING(40),
      validate: {
        isEmail: true,
      },
      unique: true,
      required: true,
    },
    password: {
      type: Sequelize.STRING(64),
      required: true,
      min: 8
    },
    imageUrl: {
      type: Sequelize.STRING()
    }
  });

  return User;
}