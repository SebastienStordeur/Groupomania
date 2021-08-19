const mysql = require('mysql');
require('dotenv').config({path: './config/.env'})

const mySQLConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSW,
  database: process.env.DB_NAME,
  multipleStatements: true
})

module.exports = mySQLConnection;