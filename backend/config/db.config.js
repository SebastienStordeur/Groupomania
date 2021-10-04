require("dotenv").config({ path: "./config/.env" })

module.exports = {
  HOST: process.env.DB_HOST,
  USER: 'root',
  PASSWORD: '989PJdCXoq3RA8o$9pAJb#7X&GRFR??$is6!BAcs',
  DB: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
};