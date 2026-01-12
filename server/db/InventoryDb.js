const mariadb = require("mariadb");

// DEBUG: confirm env variables are loaded
console.log("=== INVENTORY DB CONFIG ===");
console.log("Host:", process.env.INVENTORY_DB_HOST);
console.log("User:", process.env.INVENTORY_DB_USER);
console.log("Database:", process.env.INVENTORY_DB_NAME);
console.log("Port:", process.env.INVENTORY_DB_PORT);
console.log("==========================");

const inventoryPool = mariadb.createPool({
  host: process.env.INVENTORY_DB_HOST || "localhost",
  user: process.env.INVENTORY_DB_USER || "root",
  password: process.env.INVENTORY_DB_PASSWORD || "",
  database: process.env.INVENTORY_DB_NAME || "hopeplates",
  port: Number(process.env.INVENTORY_DB_PORT) || 3306,
  connectionLimit: 5,
  connectTimeout: 10000, // increased timeout
  acquireTimeout: 10000
});

// Test connection on startup
(async () => {
  let conn;
  try {
    conn = await inventoryPool.getConnection();
    console.log("✅ Inventory DB: Connection successful!");
    await conn.query("SELECT 1"); // Simple test query
  } catch (err) {
    console.error("❌ Inventory DB: Connection failed!");
    console.error("Error:", err.message);
    console.error("Code:", err.code);
    console.error("Errno:", err.errno);
  } finally {
    if (conn) conn.release();
  }
})();

module.exports = inventoryPool;