const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.js")(sequelize, Sequelize);
db.posts = require("./postModel.js")(sequelize, Sequelize);
db.comments = require("./commentModel.js")(sequelize, Sequelize);


module.exports = db;

//Each user can get many posts
db.users.belongsToMany(db.posts, {
  through: "User_post",
  as: "users",
  foreignKey: "user_id"
});

db.posts.belongsToMany(db.users, {
  through: "User_post",
  as: "posts",
  foreignKey: "post_id"
}) ;

/* db.comments.belongsToMany(db.posts, db.users, {
  through: "User_post",
  as: "comments",
  foreignKey: "comment_id"
}) */

// Link between comments/post/user
/* db.users.belongsToMany(db.comments, {
  through: "Post_comment",
  as: "users",
  foreignKey: "user_id"
});

db.posts.belongsToMany(db.comments, {
  through: "Post_comment",
  as: "posts",
  foreignKey: "post_id"
});

db.comments.belongsToMany(db.users, {
  through: "Post_comment", 
  as: "comment",
  foreignKey: "comment_id"
}) */