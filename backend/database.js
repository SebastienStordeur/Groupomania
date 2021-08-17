const { Sequelize } = require("sequelize");
require("dotenv").config({ path: "./config/.env" });

/* const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PSW,
  multipleStatements: true,
});



module.exports = sequelize;
global.sequelize = sequelize;
 */

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PSW, {
  host: process.env.DB_SERVER,
  dialect: "mysql",
});
try {
  await.sequelize.authentificate();
  console.log("Connecté à la DB");
} catch(error) {
  console.log('Impossible de se connecter à la DB' + error);
}

module.exports = sequelize;