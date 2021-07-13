const mysql2 = require("mysql2");
const dbConfig = require("./app/config/db.config");

let connection = mysql2.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.password,
});

module.exports = connection;
