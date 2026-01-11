const { Pool } = require("pg");

// DEBUG: check env
console.log("Beneficiary DB Host:", process.env.BENEFICIARY_DB_HOST);
console.log("Beneficiary DB User:", process.env.BENEFICIARY_DB_USER);
console.log("Beneficiary DB Name:", process.env.BENEFICIARY_DB_NAME);
console.log("Beneficiary DB Port:", process.env.BENEFICIARY_DB_PORT);

const beneficiaryPool = new Pool({
  host: process.env.BENEFICIARY_DB_HOST,
  user: process.env.BENEFICIARY_DB_USER,
  password: process.env.BENEFICIARY_DB_PASSWORD,
  database: process.env.BENEFICIARY_DB_NAME,
  port: Number(process.env.BENEFICIARY_DB_PORT)
});

module.exports = beneficiaryPool;
