const mysql2 = require("mysql2/promise");
const { Sequelize } = require("sequelize");
const dbConfig = require("./app/config/db.config");

async function initializeDB() {
  try {
    let connection = await mysql2.createPool({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      port: dbConfig.port,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${dbConfig.database};`
    );

    const database = new Sequelize({
      host: dbConfig.host,
      database: dbConfig.database,
      username: dbConfig.user,
      password: dbConfig.password,
      dialect: "mysql",
      // logging: false,
    });

    return { database, connection };
  } catch (error) {
    console.log("error from initializeDB:>> ", error);
  }
}

module.exports = initializeDB;
