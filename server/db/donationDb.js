const mariadb = require("mariadb");

const donationPool = mariadb.createPool({
  host: process.env.DONATION_DB_HOST,
  user: process.env.DONATION_DB_USER,
  password: process.env.DONATION_DB_PASSWORD,
  database: process.env.DONATION_DB_NAME,
  port: process.env.DONATION_DB_PORT,
  connectionLimit: 5
});

module.exports = donationPool;
