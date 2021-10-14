module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    content: {
      type: Sequelize.STRING(500),
      required: true
    },
    imageUrl: {
      type: Sequelize.STRING,
      required: true
    },
    like: {
      type: Sequelize.INTEGER
    },
    dislike: {
      type: Sequelize.INTEGER
    } 
  });

  return Post;
}