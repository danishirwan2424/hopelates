const { Pool } = require("pg");

const applicationPool = new Pool({
  host: process.env.APPLICATION_DB_HOST,
  user: process.env.APPLICATION_DB_USER,
  password: process.env.APPLICATION_DB_PASSWORD,
  database: process.env.APPLICATION_DB_NAME,
  port: process.env.APPLICATION_DB_PORT,
});

module.exports = applicationPool;
