module.exports = (sequelize, Sequelize) => {
    const Tag = sequelize.define("post", {
      tag: {
        type: Sequelize.STRING(20),
        required: true
      },
    });
  
    return Tag;
  }