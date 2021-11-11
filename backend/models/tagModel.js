module.exports = (sequelize, Sequelize) => {
    const Tag = sequelize.define("tag", {
      name: {
        type: Sequelize.STRING(20),
        required: true,
        unique: true,
      },
    });
  
    return Tag;
  }