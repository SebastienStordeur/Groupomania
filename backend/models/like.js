module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("like", {
    hasLiked: {
      type: Sequelize.INTEGER,
    }
  });

  return Like;
}