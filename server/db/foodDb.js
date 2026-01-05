const mysql = require("mysql2/promise");

// DEBUG: check env
console.log("Food DB Host:", process.env.FOOD_DB_HOST);
console.log("Food DB User:", process.env.FOOD_DB_USER);
console.log("Food DB Name:", process.env.FOOD_DB_NAME);
console.log("Food DB Port:", process.env.FOOD_DB_PORT);

const foodPool = mysql.createPool({
  host: process.env.FOOD_DB_HOST,
  user: process.env.FOOD_DB_USER,
  password: process.env.FOOD_DB_PASSWORD,
  database: process.env.FOOD_DB_NAME,
  port: Number(process.env.FOOD_DB_PORT),
  waitForConnections: true,
  connectionLimit: 5
});

module.exports = foodPool;
