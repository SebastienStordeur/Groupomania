module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    author: {
      type: Sequelize.STRING,
      required: false
    },
    title: {
      type: Sequelize.STRING(30),
      required: true,
    },
    content: {
      type: Sequelize.STRING(500),
      required: true
    },
    imageUrl: {
      type: Sequelize.STRING
    },
/*     like: {
      type: Sequelize.INTEGER
    },
    dislike: {
      type: Sequelize.INTEGER
    } */
  });

  return Post;
}