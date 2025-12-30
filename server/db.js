const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "hopeplates",
  password: "1234", // 🔴 COPY FROM DBEAVER
  port: 5432,
});

module.exports = pool;
