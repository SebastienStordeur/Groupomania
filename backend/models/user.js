module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    lastName: {
      type: Sequelize.STRING(20),
    },
    firstName: {
      type: Sequelize.STRING(20),

    },
    email: {
      type: Sequelize.STRING(40),
      unique: true
    },
    password: {
      type: Sequelize.STRING(64),
    }
  });

  return User;
}