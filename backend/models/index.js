const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
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

//Tables
db.users = require("./UserModel")(sequelize, Sequelize);
db.posts = require("./postModel")(sequelize, Sequelize);
db.comments = require("./commentModel")(sequelize, Sequelize);
db.likes = require("./like")(sequelize, Sequelize);

//Liaison entre table users et posts (ajout de userId dans la table post)
db.users.hasMany(db.posts);
db.posts.belongsTo(db.users);

//Liaison posts/comments et users/comments
db.posts.hasMany(db.comments);
db.users.hasOne(db.comments);
db.comments.belongsTo(db.users);

//Liaison like/posts et like/users
db.posts.hasMany(db.likes);
db.likes.belongsTo(db.users);


module.exports = db;