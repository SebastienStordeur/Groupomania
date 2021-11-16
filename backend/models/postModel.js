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
    tags: {
      type: Sequelize.STRING(1024)
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