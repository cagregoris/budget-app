const router = require("express").Router();
const pool = require("../db");
const bcrypt = require('bcrypt');

// Registering
router.post("/register", async(req, res) => {
  try {
    const { username, firstName, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username
    ]);

    if(user.rows.length !== 0) {
      return res.status(401).send("User already exists!")
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query("INSERT INTO users (username, first_name, password) VALUES ($1, $2, $3) RETURNING *", [username, firstName, bcryptPassword]);

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

module.exports = router;