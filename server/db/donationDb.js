// server/db/donationDb.js
const mariadb = require("mariadb");

const donationPool = mariadb.createPool({
  host: process.env.DONATION_DB_HOST,
  user: process.env.DONATION_DB_USER,
  password: process.env.DONATION_DB_PASSWORD,
  database: process.env.DONATION_DB_NAME,
  port: Number(process.env.DONATION_DB_PORT || 3306),
  connectionLimit: 5,
});

console.log("✅ DONATION DB POOL:", {
  host: process.env.DONATION_DB_HOST,
  user: process.env.DONATION_DB_USER,
  database: process.env.DONATION_DB_NAME,
  port: process.env.DONATION_DB_PORT,
});

module.exports = donationPool;
