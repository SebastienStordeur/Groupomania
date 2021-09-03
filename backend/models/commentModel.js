module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    author: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING(400),
      required: true,
    }
  });

  return Comment;
}