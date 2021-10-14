module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    content: {
      type: Sequelize.STRING(400),
      required: true,
    }
  });

  return Comment;
}