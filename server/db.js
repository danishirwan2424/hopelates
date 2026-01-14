// server/db.js
require("dotenv").config();

const mysql = require("mysql2/promise");
const { Pool } = require("pg");

// =====================
// MariaDB / MySQL Databases
// =====================

const donationDB = mysql.createPool({
  host: process.env.DONATION_DB_HOST,
  user: process.env.DONATION_DB_USER,
  password: process.env.DONATION_DB_PASSWORD,
  database: process.env.DONATION_DB_NAME,
  port: Number(process.env.DONATION_DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
});

const inventoryDB = mysql.createPool({
  host: process.env.INVENTORY_DB_HOST,
  user: process.env.INVENTORY_DB_USER,
  password: process.env.INVENTORY_DB_PASSWORD,
  database: process.env.INVENTORY_DB_NAME,
  port: Number(process.env.INVENTORY_DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
});

const foodDB = mysql.createPool({
  host: process.env.FOOD_DB_HOST,
  user: process.env.FOOD_DB_USER,
  password: process.env.FOOD_DB_PASSWORD,
  database: process.env.FOOD_DB_NAME,
  port: Number(process.env.FOOD_DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
});

// =====================
// PostgreSQL Databases
// =====================

// Beneficiary / Application DB
const beneficiaryDB = new Pool({
  host: process.env.APPLICATION_DB_HOST,
  user: process.env.APPLICATION_DB_USER,
  password: process.env.APPLICATION_DB_PASSWORD,
  database: process.env.APPLICATION_DB_NAME,
  port: Number(process.env.APPLICATION_DB_PORT),
});

// Auth DB
const authDB = new Pool({
  host: process.env.AUTH_DB_HOST,
  user: process.env.AUTH_DB_USER,
  password: process.env.AUTH_DB_PASSWORD,
  database: process.env.AUTH_DB_NAME,
  port: Number(process.env.AUTH_DB_PORT),
});

// =====================
// Connection Test Helper
// =====================
async function testConnections() {
  console.log("🔍 Checking database connections...");

  const tests = [
    { name: "DONATION", db: donationDB, type: "mysql" },
    { name: "INVENTORY", db: inventoryDB, type: "mysql" },
    { name: "FOOD", db: foodDB, type: "mysql" },
    { name: "BENEFICIARY", db: beneficiaryDB, type: "pg" },
    { name: "AUTH", db: authDB, type: "pg" },
  ];

  for (const { name, db, type } of tests) {
    try {
      if (type === "mysql") {
        await db.query("SELECT 1");
      } else {
        await db.query("SELECT 1");
      }
      console.log(`✅ Connected to ${name} database`);
    } catch (err) {
      console.error(`❌ ${name} DB connection failed:`, err.message);
    }
  }
}

// Run tests on server startup
testConnections();

// =====================
// Exports
// =====================
module.exports = {
  donationDB,
  inventoryDB,
  foodDB,
  beneficiaryDB,
  authDB,
};