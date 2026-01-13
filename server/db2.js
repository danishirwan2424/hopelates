const mysql = require("mysql2");

const distributionPool = mysql.createPool({
  host: "10.11.244.55",   // ✅ sama macam DBeaver (hopeplates 5)
  user: "root",
  password: "Arl1n@23",
  database: "hopeplates",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = mysqlPool;

