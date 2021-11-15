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
/*     tag: {
      type: Sequelize.STRING(1024)
    }, */
    like: {
      type: Sequelize.INTEGER
    },
    dislike: {
      type: Sequelize.INTEGER
    } 
  });

  return Post;
}