module.exports = (sequelize, Sequelize) => {

  const Role = sequelize.define('role', {
    role: {
      type: Sequelize.STRING,
      required: false
    }
  });

  return Role;
}