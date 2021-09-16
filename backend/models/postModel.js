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
    likes: {
      type: Sequelize.INTEGER
    },
    dislikes: {
      type: Sequelize.INTEGER
    },
    usersLiked: {
      type: Sequelize.JSON
    },
    usersDisliked: {
      type: Sequelize.JSON
    }
  });

  return Post;
}