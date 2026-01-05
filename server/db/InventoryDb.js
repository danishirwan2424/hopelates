const mariadb = require("mariadb");

// DEBUG: confirm env variables are loaded
console.log("Inventory DB Host:", process.env.INVENTORY_DB_HOST);
console.log("Inventory DB User:", process.env.INVENTORY_DB_USER);
console.log("Inventory DB Name:", process.env.INVENTORY_DB_NAME);
console.log("Inventory DB Port:", process.env.INVENTORY_DB_PORT);

const inventoryPool = mariadb.createPool({
  host: process.env.INVENTORY_DB_HOST,
  user: process.env.INVENTORY_DB_USER,
  password: process.env.INVENTORY_DB_PASSWORD,
  database: process.env.INVENTORY_DB_NAME,
  port: Number(process.env.INVENTORY_DB_PORT), // IMPORTANT
  connectionLimit: 5,
  connectTimeout: 5000
});

module.exports = inventoryPool;
