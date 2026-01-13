// server/db.js
const mysql = require("mysql2/promise");
const { Pool } = require("pg");

// =====================
// MariaDB / MySQL Connections
// =====================

const donationDB = mysql.createPool({
  host: process.env.DONATION_DB_HOST,
  user: process.env.DONATION_DB_USER,
  password: process.env.DONATION_DB_PASSWORD,
  database: process.env.DONATION_DB_NAME,
  port: process.env.DONATION_DB_PORT,
});

const inventoryDB = mysql.createPool({
  host: process.env.INVENTORY_DB_HOST,
  user: process.env.INVENTORY_DB_USER,
  password: process.env.INVENTORY_DB_PASSWORD,
  database: process.env.INVENTORY_DB_NAME,
  port: process.env.INVENTORY_DB_PORT,
});

const foodDB = mysql.createPool({
  host: process.env.FOOD_DB_HOST,
  user: process.env.FOOD_DB_USER,
  password: process.env.FOOD_DB_PASSWORD,
  database: process.env.FOOD_DB_NAME,
  port: process.env.FOOD_DB_PORT,
});

// =====================
// Postgres Connection (Beneficiary DB)
// =====================

const beneficiaryDB = new Pool({
  host: process.env.BENEFICIARY_DB_HOST,
  user: process.env.BENEFICIARY_DB_USER,
  password: process.env.BENEFICIARY_DB_PASSWORD,
  database: process.env.BENEFICIARY_DB_NAME,
  port: process.env.BENEFICIARY_DB_PORT,
});

// Postgres Auth DB
const authDB = new Pool({
  host: process.env.AUTH_DB_HOST,
  user: process.env.AUTH_DB_USER,
  password: process.env.AUTH_DB_PASSWORD,
  database: process.env.AUTH_DB_NAME,
  port: process.env.AUTH_DB_PORT,
});


// =====================
// Test all connections
// =====================
async function testConnections() {
  try {
    await donationDB.query("SELECT 1");
    console.log("✅ Connected to DONATION database");
  } catch (err) {
    console.error("❌ Donation DB connection failed:", err.message);
  }

  try {
    await inventoryDB.query("SELECT 1");
    console.log("✅ Connected to INVENTORY database");
  } catch (err) {
    console.error("❌ Inventory DB connection failed:", err.message);
  }

  try {
    await foodDB.query("SELECT 1");
    console.log("✅ Connected to FOOD database");
  } catch (err) {
    console.error("❌ Food DB connection failed:", err.message);
  }

  try {
    await beneficiaryDB.query("SELECT 1");
    console.log("✅ Connected to BENEFICIARY database");
  } catch (err) {
    console.error("❌ Beneficiary DB connection failed:", err.message);
  }

    try {
    await authDB.query("SELECT 1");
    console.log("✅ Connected to AUTH database");
  } catch (err) {
    console.error("❌ Auth DB connection failed:", err.message);
  }
}

// Run the test immediately
testConnections();

module.exports = {
  donationDB,
  inventoryDB,
  foodDB,
  beneficiaryDB,
};
