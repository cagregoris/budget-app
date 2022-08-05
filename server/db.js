const Pool = require("pg").Pool;

const pool = new Pool({
  user: "carolyngregoris",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "budgetapp"
});

module.exports = pool;