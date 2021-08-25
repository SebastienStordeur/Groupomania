module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    title: {
      type: Sequelize.STRING(30),
    },
    content: {
      type: Sequelize.STRING(500),
    }
  });

  return Post;
}