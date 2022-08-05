const Pool = require("pg").Pool;

const pool = new Pool({
  user: "carolyngregoris",
  password: "password",
  host: "localhost",
  database: "budgetapp"
});

module.exports = pool;