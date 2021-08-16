const Sequelize = require("sequelize");
require("dotenv").config({ path: "./config/.env" });

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PSW,
  multipleStatements: true,
});



module.exports = sequelize;
global.sequelize = sequelize;
